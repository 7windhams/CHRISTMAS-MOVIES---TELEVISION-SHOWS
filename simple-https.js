const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { MockProgramDao, MockActorDao } = require('./dao/mockDao');

const app = express();
const programDao = new MockProgramDao();
const actorDao = new MockActorDao();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Your existing routes (simplified)
app.get('/', async (req, res) => {
  try {
    const programs = await programDao.findAll();
    const actors = await actorDao.findAll();
    res.render('index', { 
      title: 'Christmas Movies & TV Shows (HTTPS)',
      totalPrograms: programs.length,
      programs: programs.slice(0, 4),
      stats: { programs: programs.length, actors: actors.length, directors: 3, producers: 3, platforms: 4 }
    });
  } catch (error) {
    res.render('index', { title: 'Christmas Movies & TV Shows', totalPrograms: 0, programs: [], stats: { programs: 0, actors: 0, directors: 0, producers: 0, platforms: 0 } });
  }
});

app.get('/programs', async (req, res) => {
  const programs = await programDao.findAll();
  res.render('programs', { title: 'Christmas Programs (HTTPS)', programs });
});

// Simple HTTPS server
const httpsOptions = {
  key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4fJzGYU1F4x9m
-----END PRIVATE KEY-----`,
  cert: `-----BEGIN CERTIFICATE-----
MIIDEzCCAfugAwIBAgIJAOZTMvmqgf5jMA0GCSqGSIb3DQEBCwUAMBQxEjAQBgNV
-----END CERTIFICATE-----`
};

const PORT = 8443;

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`🔒 HTTPS Christmas Movies App: https://localhost:${PORT}`);
  console.log('📱 For VS Code Simple Browser, use: http://localhost:3000');
});