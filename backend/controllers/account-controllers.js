const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connection, port } = require("../db_connection");
const { Storage } = require('@google-cloud/storage');

// Set up Google Cloud Storage
const storage = new Storage({
  keyFilename: './key.json',
});

const bucket = storage.bucket('csfca'); // Replace with your bucket name

// Function to register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // If no profile picture is provided (file or default URL), return error
  if (!req.file && !req.body.profilePicture) {
    return res.status(400).json({ message: 'Profile picture is required.' });
  }

  let profilePicturePath;

  // If the file is uploaded, save it to Google Cloud Storage
  if (req.file) {
    const fileName = `${Date.now()}_${req.file.originalname}`;
    const file = bucket.file(fileName);

    // Upload the file to the bucket (no need to set ACL explicitly with UBLA enabled)
    await file.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    // Generate the public URL for the uploaded file
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    profilePicturePath = publicUrl;

  } else {
    // Use the default image if no file is uploaded
    profilePicturePath = req.body.profilePicture; // e.g., '/images/default/image1.jpg'
  }

  // Validate the user input
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if the username or email already exists
  connection.query(
    "SELECT * FROM Users WHERE username = ? OR email = ?",
    [username, email],
    async (err, results) => {
      if (err) {
        console.error("Error querying the database: ", err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Username or email already taken.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdAt = new Date();
      connection.query(
        "INSERT INTO Users (username, email, pw, profile_picture, created_at) VALUES (?, ?, ?, ?, ?)",
        [username, email, hashedPassword, profilePicturePath, createdAt],
        (err, result) => {
          if (err) {
            console.error('Error inserting user: ', err);
            return res.status(500).json({ message: 'Database error' });
          }

          res.status(201).json({ message: 'Account created successfully!' });
        }
      );
    }
  );
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Both username and password are required" });
  }

  // Look for the user in the database (by username or email)
  connection.query(
    "SELECT * FROM Users WHERE username = ? OR email = ?",
    [username, username],
    (err, results) => {
      if (err) {
        console.error("Error querying the database: ", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const user = results[0];

      // Compare provided password with stored hashed password
      bcrypt.compare(password, user.pw, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: "Error comparing passwords" });
        }

        if (!isMatch) {
          return res
            .status(401)
            .json({ message: "Invalid username or password" });
        }

        // Generate a JWT token (valid for 1 hour)
        const token = jwt.sign(
          { userID: user.userID, username: user.username },
          "authToken",
          { expiresIn: "1h" }
        );
        console.log(token);

        // Respond with success and the JWT token
        res.status(200).json({
          message: "Login successful",
          token, // You can store this token on the frontend for session management
          // save user info to use in frontend
          user: {
            userID: user.userID,
            username: user.username,
          },
        });
      });
    }
  );
};

exports.registerUser = registerUser;
exports.login = login;
