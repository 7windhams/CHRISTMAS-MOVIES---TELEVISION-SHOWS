const express = require('express');
const path = require('path');
const { MockProgramDao, MockActorDao } = require('./dao/mockDao');

const app = express();
const PORT = 3000;

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Basic middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initialize DAOs
const programDao = new MockProgramDao();
const actorDao = new MockActorDao();

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Christmas Movies & TV Shows' });
});

app.get('/test', (req, res) => {
  console.log('=== Test route called ===');
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

app.get('/programs', async (req, res) => {
  try {
    console.log('=== Programs route called ===');
    const programs = await programDao.findAll();
    console.log('Programs found:', programs.length);
    if (programs.length > 0) {
      console.log('First program:', programs[0]?.title);
    }
    console.log('About to render template...');
    res.render('programs-simple', { title: 'Christmas Programs', programs });
    console.log('Template rendered successfully');
  } catch (error) {
    console.error('=== Programs route error ===', error);
    res.render('error', { title: 'Error', error: 'Could not load programs: ' + error.message });
  }
});

app.get('/actors', async (req, res) => {
  try {
    const actors = await actorDao.findAll();
    res.render('actors', { title: 'Actors', actors });
  } catch (error) {
    console.error('Actors route error:', error);
    res.render('error', { title: 'Error', error: 'Could not load actors' });
  }
});

app.get('/add-actor', (req, res) => {
  res.render('add-actor', { title: 'Add Actor' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Simple server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('- GET / (homepage)');
  console.log('- GET /test (test endpoint)');
  console.log('- GET /programs (programs list)');
  console.log('- GET /actors (actors list)');
  console.log('- GET /add-actor (add actor form)');
});