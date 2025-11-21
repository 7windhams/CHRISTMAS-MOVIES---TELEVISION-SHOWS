const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'christmas_movies'
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Christmas Movies & TV Shows API' });
});

// API Routes
app.get('/api/movies', (req, res) => {
  const query = 'SELECT * FROM movies';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching movies:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/tvshows', (req, res) => {
  const query = 'SELECT * FROM tvshows';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching TV shows:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/movies/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM movies WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching movie:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }
    res.json(results[0]);
  });
});

app.get('/api/tvshows/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM tvshows WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching TV show:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'TV show not found' });
      return;
    }
    res.json(results[0]);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;