const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const validator = require('validator');

// Import DAO classes
const { ProgramDao, ActorDao, DirectorDao, ProducerDao, StreamingPlatformDao } = require('./dao');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize DAO instances
const programDao = new ProgramDao();
const actorDao = new ActorDao();
const directorDao = new DirectorDao();
const producerDao = new ProducerDao();
const streamingPlatformDao = new StreamingPlatformDao();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes for Web Pages (EJS Views)
app.get('/', async (req, res) => {
  try {
    const programs = await programDao.findAll();
    const totalPrograms = await programDao.countAll();
    res.render('index', { 
      title: 'Christmas Movies & TV Shows',
      programs: programs.slice(0, 6), // Show first 6 for preview
      totalPrograms
    });
  } catch (error) {
    console.error('Error loading homepage:', error);
    res.render('error', { error: 'Unable to load programs' });
  }
});

app.get('/programs', async (req, res) => {
  try {
    const programs = await programDao.findAll();
    res.render('programs', { 
      title: 'All Programs',
      programs
    });
  } catch (error) {
    console.error('Error loading programs:', error);
    res.render('error', { error: 'Unable to load programs' });
  }
});

app.get('/programs/:id', async (req, res) => {
  try {
    const program = await programDao.findById(req.params.id);
    if (!program) {
      return res.status(404).render('404', { title: 'Program Not Found' });
    }
    res.render('program-detail', { 
      title: program.title,
      program
    });
  } catch (error) {
    console.error('Error loading program detail:', error);
    res.render('error', { error: 'Unable to load program details' });
  }
});

app.get('/actors', async (req, res) => {
  try {
    const actors = await actorDao.findAll();
    res.render('actors', { 
      title: 'Actors',
      actors
    });
  } catch (error) {
    console.error('Error loading actors:', error);
    res.render('error', { error: 'Unable to load actors' });
  }
});

// Add Actor Form
app.get('/add-actor', async (req, res) => {
  res.render('add-actor', { title: 'Add New Actor' });
});

app.post('/add-actor', async (req, res) => {
  try {
    const { name, birth_date, nationality, biography } = req.body;
    
    // Validate required fields
    if (!name || name.trim().length === 0) {
      return res.render('add-actor', { 
        title: 'Add New Actor', 
        error: 'Name is required and cannot be empty',
        formData: req.body
      });
    }

    // Validate name format (basic check)
    if (!validator.isLength(name.trim(), { min: 2, max: 255 })) {
      return res.render('add-actor', { 
        title: 'Add New Actor', 
        error: 'Name must be between 2 and 255 characters',
        formData: req.body
      });
    }

    // Validate birth date if provided
    if (birth_date && !validator.isDate(birth_date)) {
      return res.render('add-actor', { 
        title: 'Add New Actor', 
        error: 'Invalid birth date format',
        formData: req.body
      });
    }

    // Validate nationality if provided
    if (nationality && !validator.isLength(nationality.trim(), { max: 100 })) {
      return res.render('add-actor', { 
        title: 'Add New Actor', 
        error: 'Nationality must be 100 characters or less',
        formData: req.body
      });
    }

    // Validate biography if provided
    if (biography && !validator.isLength(biography.trim(), { max: 1000 })) {
      return res.render('add-actor', { 
        title: 'Add New Actor', 
        error: 'Biography must be 1000 characters or less',
        formData: req.body
      });
    }

    const actorData = {
      name: name.trim(),
      birth_date: birth_date || null,
      nationality: nationality ? nationality.trim() : null,
      biography: biography ? biography.trim() : null
    };

    const result = await actorDao.create(actorData);
    
    if (result.insertId) {
      res.redirect('/actors?success=Actor added successfully');
    } else {
      res.render('add-actor', { 
        title: 'Add New Actor', 
        error: 'Failed to add actor',
        formData: req.body
      });
    }
  } catch (error) {
    console.error('Error adding actor:', error);
    res.render('add-actor', { 
      title: 'Add New Actor', 
      error: 'Database error occurred',
      formData: req.body
    });
  }
});

// Add Program Form (Bonus Feature)
app.get('/add-program', async (req, res) => {
  try {
    const [producers, directors, actors, streamingPlatforms] = await Promise.all([
      producerDao.findAll(),
      directorDao.findAll(),
      actorDao.findAll(),
      streamingPlatformDao.findAll()
    ]);

    res.render('add-program', { 
      title: 'Add New Program',
      producers,
      directors,
      actors,
      streamingPlatforms
    });
  } catch (error) {
    console.error('Error loading add-program page:', error);
    res.render('error', { error: 'Unable to load form data' });
  }
});

app.post('/add-program', async (req, res) => {
  let connection;
  try {
    const { 
      title, yr_released, runtime, format, type, program_rating, rating,
      producer_id, img_url, description, seasons, episodes,
      directors, actors, platforms 
    } = req.body;

    // Validate required fields
    if (!title || !yr_released || !format || !type || !program_rating || !description) {
      const [producers, directorsList, actorsList, streamingPlatforms] = await Promise.all([
        producerDao.findAll(),
        directorDao.findAll(),
        actorDao.findAll(),
        streamingPlatformDao.findAll()
      ]);

      return res.render('add-program', {
        title: 'Add New Program',
        error: 'Please fill in all required fields',
        formData: req.body,
        producers,
        directors: directorsList,
        actors: actorsList,
        streamingPlatforms
      });
    }

    // Prepare program data
    const programData = {
      title,
      yr_released: parseInt(yr_released),
      runtime: runtime ? parseInt(runtime) : null,
      producer_id: producer_id || null,
      format,
      program_rating,
      rating: rating ? parseFloat(rating) : null,
      img_url: img_url || null,
      description,
      type,
      seasons: (type === 'tv_show' && seasons) ? parseInt(seasons) : null,
      episodes: (type === 'tv_show' && episodes) ? parseInt(episodes) : null
    };

    // Create the program first
    const result = await programDao.create(programData);
    const programId = result.insertId;

    if (programId) {
      // Get connection for transaction
      connection = await programDao.getConnection();
      await connection.beginTransaction();

      try {
        // Add directors if selected
        if (directors && Array.isArray(directors)) {
          for (const directorId of directors) {
            await connection.execute(
              'INSERT INTO program_director (program_id, director_id, role) VALUES (?, ?, ?)',
              [programId, parseInt(directorId), 'Director']
            );
          }
        }

        // Add actors if selected  
        if (actors && Array.isArray(actors)) {
          for (const actorId of actors) {
            await connection.execute(
              'INSERT INTO program_actor (program_id, actor_id, role_type) VALUES (?, ?, ?)',
              [programId, parseInt(actorId), 'supporting']
            );
          }
        }

        // Add streaming platforms if selected
        if (platforms && Array.isArray(platforms)) {
          for (const platformId of platforms) {
            await connection.execute(
              'INSERT INTO program_streaming_platform (program_id, platform_id, available_from, is_currently_available) VALUES (?, ?, CURDATE(), TRUE)',
              [programId, parseInt(platformId)]
            );
          }
        }

        await connection.commit();
        res.redirect('/programs?success=Program added successfully');

      } catch (error) {
        await connection.rollback();
        throw error;
      }
    } else {
      throw new Error('Failed to create program');
    }

  } catch (error) {
    console.error('Error adding program:', error);
    
    try {
      const [producers, directorsList, actorsList, streamingPlatforms] = await Promise.all([
        producerDao.findAll(),
        directorDao.findAll(),
        actorDao.findAll(),
        streamingPlatformDao.findAll()
      ]);

      res.render('add-program', {
        title: 'Add New Program',
        error: 'Database error occurred: ' + error.message,
        formData: req.body,
        producers,
        directors: directorsList,
        actors: actorsList,
        streamingPlatforms
      });
    } catch (secondError) {
      console.error('Error loading form data after error:', secondError);
      res.render('error', { error: 'A system error occurred' });
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

// API Routes (for Postman testing)
app.get('/api/programs', async (req, res) => {
  try {
    const programs = await programDao.findAll();
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/programs/:id', async (req, res) => {
  try {
    const program = await programDao.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    res.json(program);
  } catch (error) {
    console.error('Error fetching program:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/programs/rating/:rating', async (req, res) => {
  try {
    const programs = await programDao.findByRating(req.params.rating);
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs by rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/programs/platform/:platform', async (req, res) => {
  try {
    const programs = await programDao.findByStreamingPlatform(req.params.platform);
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs by platform:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get movies only
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await programDao.findByType('movie');
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get TV shows only
app.get('/api/tvshows', async (req, res) => {
  try {
    const tvShows = await programDao.findByType('tv_show');
    res.json(tvShows);
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get programs by format
app.get('/api/programs/format/:format', async (req, res) => {
  try {
    const programs = await programDao.findByFormat(req.params.format);
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs by format:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get programs by year range
app.get('/api/programs/years/:startYear/:endYear', async (req, res) => {
  try {
    const { startYear, endYear } = req.params;
    const programs = await programDao.findByYearRange(parseInt(startYear), parseInt(endYear));
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs by year range:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/actors', async (req, res) => {
  try {
    const actors = await actorDao.findAll();
    res.json(actors);
  } catch (error) {
    console.error('Error fetching actors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/actors/:id', async (req, res) => {
  try {
    const actor = await actorDao.findById(req.params.id);
    if (!actor) {
      return res.status(404).json({ error: 'Actor not found' });
    }
    res.json(actor);
  } catch (error) {
    console.error('Error fetching actor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/actors', async (req, res) => {
  try {
    const result = await actorDao.create(req.body);
    res.status(201).json({ message: 'Actor created successfully', id: result.insertId });
  } catch (error) {
    console.error('Error creating actor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/directors', async (req, res) => {
  try {
    const directors = await directorDao.findAll();
    res.json(directors);
  } catch (error) {
    console.error('Error fetching directors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/producers', async (req, res) => {
  try {
    const producers = await producerDao.findAll();
    res.json(producers);
  } catch (error) {
    console.error('Error fetching producers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/streaming-platforms', async (req, res) => {
  try {
    const platforms = await streamingPlatformDao.findAll();
    res.json(platforms);
  } catch (error) {
    console.error('Error fetching streaming platforms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search endpoint
app.get('/api/search', async (req, res) => {
  try {
    const { q, type } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query parameter "q" is required' });
    }

    let results = [];
    
    switch(type) {
      case 'programs':
        results = await programDao.search('title', q);
        break;
      case 'actors':
        results = await actorDao.search('name', q);
        break;
      case 'directors':
        results = await directorDao.search('name', q);
        break;
      default:
        // Search all programs by default
        results = await programDao.search('title', q);
    }

    res.json(results);
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 404 handler for web routes
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({ error: 'API endpoint not found' });
  } else {
    res.status(404).render('404', { title: 'Page Not Found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;