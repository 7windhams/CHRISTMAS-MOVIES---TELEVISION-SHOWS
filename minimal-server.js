require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World! Server is working on port 3001');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working', timestamp: new Date() });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Minimal server running on http://localhost:${PORT}`);
});

// Test database connection separately
setTimeout(async () => {
  try {
    console.log('Testing database connection...');
    const { ProgramDao } = require('./dao');
    const programDao = new ProgramDao();
    const programs = await programDao.findAll();
    console.log(`✅ Database test successful: Found ${programs.length} programs`);
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  }
}, 1000);