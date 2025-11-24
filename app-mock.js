const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const rateLimit = require('express-rate-limit');
const validator = require('validator');

// Import my mock data since I don't have MySQL set up yet
const { MockProgramDao, MockActorDao } = require('./dao/mockDao');

const app = express();
const PORT = 3000;

// Set up my DAOs
const programDao = new MockProgramDao();
const actorDao = new MockActorDao();

// Basic security stuff I learned about
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100
});

// Helper function to clean up user input
function cleanInput(input) {
  if (typeof input !== 'string') return input;
  return validator.escape(input.trim());
}

// Check if input is valid
function isValidName(name) {
  return name && name.trim().length > 0 && name.trim().length <= 100 && /^[a-zA-Z\s'-]+$/.test(name.trim());
}

function isValidDate(date) {
  return date && validator.isDate(date) && new Date(date) <= new Date();
}

function isValidNationality(nationality) {
  return nationality && nationality.trim().length > 0 && nationality.trim().length <= 50 && /^[a-zA-Z\s]+$/.test(nationality.trim());
}

function isValidId(id) {
  return validator.isInt(id.toString(), { min: 1 });
}

// Middleware setup
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Christmas Movies & TV Shows' });
});

app.get('/programs', async (req, res) => {
  try {
    const programs = await programDao.findAll();
    console.log('Found programs:', programs.length); // Debug log
    res.render('programs', { title: 'Christmas Programs', programs });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).render('error', { title: 'Error', error: 'Could not load programs' });
  }
});

app.get('/actors', async (req, res) => {
  try {
    const actors = await actorDao.findAll();
    res.render('actors', { title: 'Actors', actors });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).render('error', { title: 'Error', error: 'Could not load actors' });
  }
});

app.get('/add-actor', (req, res) => {
  res.render('add-actor', { title: 'Add Actor' });
});

app.post('/add-actor', async (req, res) => {
  try {
    const { first_name, last_name, birth_date, nationality } = req.body;
    
    // Basic validation
    let errors = [];
    
    if (!isValidName(first_name)) {
      errors.push('Please enter a valid first name');
    }
    if (!isValidName(last_name)) {
      errors.push('Please enter a valid last name');
    }
    if (!isValidDate(birth_date)) {
      errors.push('Please enter a valid birth date');
    }
    if (!isValidNationality(nationality)) {
      errors.push('Please enter a valid nationality');
    }
    
    if (errors.length > 0) {
      return res.render('add-actor', { 
        title: 'Add Actor', 
        errors: errors,
        formData: { first_name, last_name, birth_date, nationality }
      });
    }
    
    // Clean the data
    const actorData = {
      first_name: cleanInput(first_name),
      last_name: cleanInput(last_name),
      birth_date: birth_date,
      nationality: cleanInput(nationality)
    };
    
    await actorDao.create(actorData);
    res.redirect('/actors');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).render('error', { title: 'Error', error: 'Could not add actor' });
  }
});

// API endpoints for testing
app.get('/api/programs', async (req, res) => {
  try {
    const programs = await programDao.findAll();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: 'Could not get programs' });
  }
});

app.get('/api/programs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidId(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    
    const program = await programDao.findById(id);
    if (program) {
      res.json(program);
    } else {
      res.status(404).json({ error: 'Program not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/actors', async (req, res) => {
  try {
    const actors = await actorDao.findAll();
    res.json(actors);
  } catch (error) {
    res.status(500).json({ error: 'Could not get actors' });
  }
});

app.get('/api/actors/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidId(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    
    const actor = await actorDao.findById(id);
    if (actor) {
      res.json(actor);
    } else {
      res.status(404).json({ error: 'Actor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Search
app.get('/api/search', async (req, res) => {
  try {
    const { type, query } = req.query;
    
    if (!type || !query) {
      return res.status(400).json({ error: 'Missing type or query' });
    }
    
    let results = [];
    if (type === 'programs') {
      results = await programDao.search('title', query);
    } else if (type === 'actors') {
      results = await actorDao.search('last_name', query);
    }
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// 404 handler
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({ error: 'Not found' });
  } else {
    res.status(404).render('404', { title: 'Page Not Found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});