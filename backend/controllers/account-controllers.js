const bcrypt = require('bcryptjs');
const db = require('../db_connection');  // Importing the database connection

// User registration logic
const registerUser = async (req, res) => {
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
};

module.exports = { registerUser };
