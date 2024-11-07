const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for frontend-backend communication
app.use(bodyParser.json()); // Parse JSON bodies

// MySQL connection
const db = mysql.createConnection({
  host: '99.106.34.153',
  user: 'csfca',
  password: 'sIvenTaIDE2024',
  database: 'csfca',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

// User registration endpoint
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if the username or email already exists
  db.query('SELECT * FROM Users WHERE username = ? OR email = ?', [username, email], async (err, results) => {
    if (err) {
      console.error('Error querying the database: ', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Username or email already taken.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const createdAt = new Date();
    db.query('INSERT INTO Users (username, email, password, created_at) VALUES (?, ?, ?, ?)', 
      [username, email, hashedPassword, createdAt], (err, result) => {
        if (err) {
          console.error('Error inserting user: ', err);
          return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json({ message: 'Account created successfully!' });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
