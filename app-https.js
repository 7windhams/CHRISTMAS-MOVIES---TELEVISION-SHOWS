const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const rateLimit = require('express-rate-limit');
const validator = require('validator');

// Import my mock data since I don't have MySQL set up yet
const { MockProgramDao, MockActorDao } = require('./dao/mockDao');

const app = express();
const PORT = 3000;
const HTTPS_PORT = 3443;

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
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Force HTTPS redirect middleware
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && !req.secure) {
    return res.redirect(`https://${req.header('host')}${req.url}`);
  }
  next();
});

// Routes
app.get('/', async (req, res) => {
  try {
    const programs = await programDao.findAll();
    const actors = await actorDao.findAll();
    res.render('index', { 
      title: 'Christmas Movies & TV Shows',
      totalPrograms: programs.length,
      programs: programs.slice(0, 4), // Show first 4 programs as featured
      stats: {
        programs: programs.length,
        actors: actors.length,
        directors: 3, // Mock data
        producers: 3, // Mock data
        platforms: 4  // Mock data
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.render('index', { 
      title: 'Christmas Movies & TV Shows',
      totalPrograms: 0,
      programs: [],
      stats: { programs: 0, actors: 0, directors: 0, producers: 0, platforms: 0 }
    });
  }
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

// Add Program Form
app.get('/add-program', (req, res) => {
  res.render('add-program', { 
    title: 'Add New Program',
    producers: [],
    directors: [],
    actors: [],
    streamingPlatforms: []
  });
});

app.post('/add-program', async (req, res) => {
  try {
    const { 
      title, yr_released, runtime, format, type, program_rating, rating, description
    } = req.body;
    
    // Basic validation
    let errors = [];
    if (!title || title.trim().length === 0) {
      errors.push('Title is required');
    }
    if (!yr_released || isNaN(yr_released) || yr_released < 1900 || yr_released > new Date().getFullYear()) {
      errors.push('Valid release year is required');
    }
    if (!format) {
      errors.push('Format is required');
    }
    if (!program_rating) {
      errors.push('Program rating is required');
    }
    
    if (errors.length > 0) {
      return res.render('add-program', { 
        title: 'Add New Program', 
        errors: errors,
        formData: req.body,
        producers: [],
        directors: [],
        actors: [],
        streamingPlatforms: []
      });
    }
    
    // Create program data
    const programData = {
      title: title.trim(),
      yr_released: parseInt(yr_released),
      runtime: runtime ? parseInt(runtime) : null,
      format: format,
      type: type || 'Movie',
      program_rating: program_rating,
      rating: rating ? parseFloat(rating) : null,
      description: description ? description.trim() : null,
      producer_name: 'Independent',
      directors: 'Various',
      actors: 'Cast',
      streaming_platforms: 'Multiple Platforms'
    };
    
    await programDao.create(programData);
    res.redirect('/programs?added=success');
  } catch (error) {
    console.error('Error adding program:', error);
    res.render('add-program', { 
      title: 'Add New Program', 
      error: 'Database error occurred',
      formData: req.body,
      producers: [],
      directors: [],
      actors: [],
      streamingPlatforms: []
    });
  }
});

app.post('/add-actor', async (req, res) => {
  try {
    const { first_name, last_name, birth_date, nationality } = req.body;
    
    // Basic validation
    let errors = [];
    
    if (!first_name || !isValidName(first_name)) {
      errors.push('Valid first name is required (letters, spaces, hyphens, and apostrophes only)');
    }
    
    if (!last_name || !isValidName(last_name)) {
      errors.push('Valid last name is required (letters, spaces, hyphens, and apostrophes only)');
    }
    
    if (!birth_date || !isValidDate(birth_date)) {
      errors.push('Valid birth date is required (cannot be in the future)');
    }
    
    if (!nationality || !isValidNationality(nationality)) {
      errors.push('Valid nationality is required (letters and spaces only)');
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
      return res.status(400).json({ error: 'Invalid program ID' });
    }
    
    const program = await programDao.findById(id);
    if (program) {
      res.json(program);
    } else {
      res.status(404).json({ error: 'Program not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not get program' });
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
      return res.status(400).json({ error: 'Invalid actor ID' });
    }
    
    const actor = await actorDao.findById(id);
    if (actor) {
      res.json(actor);
    } else {
      res.status(404).json({ error: 'Actor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not get actor' });
  }
});

// Delete program endpoint
app.delete('/api/programs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await programDao.delete(id);
    
    if (result.affectedRows > 0) {
      res.json({ 
        success: true, 
        message: 'Program deleted successfully',
        deletedId: id 
      });
    } else {
      res.status(404).json({ 
        success: false, 
        error: 'Program not found' 
      });
    }
  } catch (error) {
    console.error('Error deleting program:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// Web route for deleting programs
app.post('/programs/:id/delete', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await programDao.delete(id);
    
    if (result.affectedRows > 0) {
      res.redirect('/programs?deleted=success');
    } else {
      res.redirect('/programs?error=not-found');
    }
  } catch (error) {
    console.error('Error deleting program:', error);
    res.redirect('/programs?error=server-error');
  }
});

// Create self-signed certificate for development
const createSelfSignedCert = () => {
  const selfsigned = require('selfsigned');
  const attrs = [
    { name: 'commonName', value: 'localhost' },
    { name: 'countryName', value: 'US' },
    { shortName: 'ST', value: 'MS' },
    { name: 'localityName', value: 'Jackson' },
    { name: 'organizationName', value: 'Christmas Movies App' }
  ];
  
  const pems = selfsigned.generate(attrs, { 
    keySize: 2048,
    days: 365,
    algorithm: 'sha256',
    extensions: [{
      name: 'basicConstraints',
      cA: true
    }, {
      name: 'keyUsage',
      keyCertSign: true,
      digitalSignature: true,
      nonRepudiation: true,
      keyEncipherment: true,
      dataEncipherment: true
    }, {
      name: 'subjectAltName',
      altNames: [{
        type: 2, // DNS
        value: 'localhost'
      }, {
        type: 7, // IP
        ip: '127.0.0.1'
      }]
    }]
  });
  
  return {
    key: pems.private,
    cert: pems.cert
  };
};

// Start HTTPS server
try {
  let httpsOptions;
  
  // Try to use existing SSL certificates
  try {
    httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, 'ssl', 'private.key')),
      cert: fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.crt'))
    };
    console.log('📜 Using existing SSL certificates');
  } catch (err) {
    // Generate self-signed certificate for development
    console.log('🔧 Generating self-signed certificate for development...');
    try {
      const selfSignedCert = createSelfSignedCert();
      httpsOptions = {
        key: selfSignedCert.key,
        cert: selfSignedCert.cert
      };
      console.log('✅ Self-signed certificate generated');
    } catch (selfSignedErr) {
      console.log('❌ Could not generate self-signed certificate. Using HTTP only.');
      // Fallback to HTTP only
      app.listen(PORT, () => {
        console.log(`🎄 Christmas Movies App running on:`);
        console.log(`   HTTP:  http://localhost:${PORT}`);
        console.log('⚠️  HTTPS not available - SSL certificate generation failed');
      });
      module.exports = app;
      return;
    }
  }
  
  // Start HTTPS server
  https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
    console.log(`🎄 Christmas Movies App running on:`);
    console.log(`   HTTPS: https://localhost:${HTTPS_PORT}`);
    console.log(`   HTTP:  http://localhost:${PORT} (redirects to HTTPS)`);
    console.log('🔒 Secure connection established!');
  });
  
  // Start HTTP server that redirects to HTTPS
  const httpApp = express();
  httpApp.use((req, res) => {
    res.redirect(`https://${req.headers.host.replace(`:${PORT}`, `:${HTTPS_PORT}`)}${req.url}`);
  });
  
  httpApp.listen(PORT, () => {
    console.log(`🔄 HTTP redirect server running on port ${PORT}`);
  });

} catch (error) {
  console.error('❌ HTTPS setup failed:', error.message);
  console.log('🔄 Falling back to HTTP only...');
  
  // Fallback to HTTP only
  app.listen(PORT, () => {
    console.log(`🎄 Christmas Movies App running on:`);
    console.log(`   HTTP: http://localhost:${PORT}`);
    console.log('⚠️  HTTPS not available');
  });
}

module.exports = app;