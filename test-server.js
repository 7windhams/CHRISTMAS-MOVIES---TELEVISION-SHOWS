const express = require('express');
require('dotenv').config();

// Import DAO classes
const { ProgramDao } = require('./dao');

const app = express();
app.use(express.json());

// Simple test route
app.get('/test', async (req, res) => {
  try {
    console.log('Testing database connection...');
    const programDao = new ProgramDao();
    
    console.log('Calling findAll...');
    const programs = await programDao.findAll();
    
    console.log(`Found ${programs.length} programs`);
    res.json({ 
      success: true, 
      count: programs.length,
      sample: programs.slice(0, 3) 
    });
  } catch (error) {
    console.error('Test error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: error.stack
    });
  }
});

app.listen(3001, () => {
  console.log('Test server running on http://localhost:3001');
  console.log('Try: http://localhost:3001/test');
});