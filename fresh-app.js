const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import mock data
const { MockProgramDao, MockActorDao } = require('./dao/mockDao');
const programDao = new MockProgramDao();
const actorDao = new MockActorDao();

// Test route first
app.get('/test', (req, res) => {
  console.log('=== TEST ROUTE HIT ===');
  res.json({ 
    message: 'Server is working!', 
    timestamp: new Date().toISOString(),
    routes: ['/', '/test', '/programs', '/actors', '/add-actor']
  });
});

// Home route
app.get('/', (req, res) => {
  console.log('=== HOME ROUTE HIT ===');
  res.render('index', { title: 'Christmas Movies & TV Shows' });
});

// Programs route
app.get('/programs', async (req, res) => {
  console.log('=== PROGRAMS ROUTE HIT ===');
  try {
    const programs = await programDao.findAll();
    console.log(`Found ${programs.length} programs`);
    
    // Simple HTML response for now
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Christmas Programs</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .program { background: #f5f5f5; padding: 20px; margin: 10px 0; border-radius: 8px; }
        h1 { color: #c41e3a; }
        h2 { color: #228b22; }
        .nav { margin: 20px 0; }
        .nav a { margin-right: 20px; padding: 10px 15px; background: #c41e3a; color: white; text-decoration: none; border-radius: 5px; }
      </style>
    </head>
    <body>
      <h1>🎄 Christmas Programs 🎄</h1>
      <div class="nav">
        <a href="/">Home</a>
        <a href="/programs">Programs</a>
        <a href="/actors">Actors</a>
        <a href="/test">Test</a>
      </div>
      <div>
    `;
    
    programs.forEach(program => {
      html += `
        <div class="program">
          <h2>${program.title}</h2>
          <p><strong>Year:</strong> ${program.yr_released} | <strong>Format:</strong> ${program.format} | <strong>Rating:</strong> ${program.program_rating}</p>
          <p>${program.description}</p>
          ${program.directors ? `<p><strong>Director:</strong> ${program.directors}</p>` : ''}
          ${program.actors ? `<p><strong>Cast:</strong> ${program.actors}</p>` : ''}
          ${program.streaming_platforms ? `<p><strong>Available on:</strong> ${program.streaming_platforms}</p>` : ''}
        </div>
      `;
    });
    
    html += `
      </div>
    </body>
    </html>
    `;
    
    res.send(html);
  } catch (error) {
    console.error('Programs error:', error);
    res.status(500).send(`<h1>Error loading programs</h1><p>${error.message}</p>`);
  }
});

// Actors route
app.get('/actors', async (req, res) => {
  console.log('=== ACTORS ROUTE HIT ===');
  try {
    const actors = await actorDao.findAll();
    res.json({ actors, count: actors.length });
  } catch (error) {
    console.error('Actors error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  console.log(`=== 404: ${req.method} ${req.path} ===`);
  res.status(404).send(`
    <h1>404 - Page Not Found</h1>
    <p>Looking for: ${req.path}</p>
    <p>Available routes:</p>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/test">Test</a></li>
      <li><a href="/programs">Programs</a></li>
      <li><a href="/actors">Actors</a></li>
    </ul>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`\\n=== FRESH SERVER STARTED ===`);
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`Test: http://localhost:${PORT}/test`);
  console.log(`Programs: http://localhost:${PORT}/programs`);
  console.log(`================================\\n`);
});

module.exports = app;