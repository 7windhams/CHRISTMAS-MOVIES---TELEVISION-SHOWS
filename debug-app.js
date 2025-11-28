require('dotenv').config();
const express = require('express');
const path = require('path');

// Import DAO classes
const { ProgramDao } = require('./dao');

const app = express();
const programDao = new ProgramDao();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Simple test route without database
app.get('/test', (req, res) => {
  res.send('Server is working!');
});

// Test route with database
app.get('/test-db', async (req, res) => {
  try {
    console.log('Testing database...');
    const programs = await programDao.findAll();
    console.log(`Found ${programs.length} programs`);
    res.json({ success: true, count: programs.length });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Simplified homepage
app.get('/', async (req, res) => {
  try {
    console.log('Loading homepage...');
    const programs = await programDao.findAll();
    const totalPrograms = await programDao.countAll();
    
    console.log(`Found ${programs.length} programs, total: ${totalPrograms}`);
    
    res.render('index', { 
      title: 'Christmas Movies & TV Shows',
      programs: programs.slice(0, 6),
      totalPrograms
    });
  } catch (error) {
    console.error('Homepage error:', error);
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.listen(3000, () => {
  console.log('Debug server running on http://localhost:3000');
});