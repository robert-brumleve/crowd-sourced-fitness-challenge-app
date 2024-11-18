const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connection, port } = require("../db_connection");

// User registration logic
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if the username or email already exists
  connection.query(
    "SELECT * FROM Users WHERE username = ? OR email = ?",
    [username, email],
    async (err, results) => {
      if (err) {
        console.error("Error querying the database: ", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length > 0) {
        return res
          .status(400)
          .json({ message: "Username or email already taken." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      const createdAt = new Date();
      connection.query(
        "INSERT INTO Users (username, email, password, created_at) VALUES (?, ?, ?, ?)",
        [username, email, hashedPassword, createdAt],
        (err, result) => {
          if (err) {
            console.error("Error inserting user: ", err);
            return res.status(500).json({ message: "Database error" });
          }

          res.status(201).json({ message: "Account created successfully!" });
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
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: "Error comparing passwords" });
        }

        if (!isMatch) {
          return res
            .status(401)
            .json({ message: "Invalid username or password" });
        }

        // Store user info in session after successful login
        req.session.user = {
          userID: user.userID,
          username: user.username,
        };

        // Generate a JWT token (valid for 1 hour)
        const token = jwt.sign(
          { userID: user.userID, username: user.username },
          "your_jwt_secret",
          { expiresIn: "1h" }
        );

        // Respond with success and the JWT token
        res.status(200).json({
          message: "Login successful",
          username: user.username,
          userID: user.userID,
          token, // You can store this token on the frontend for session management
        });
      });
    }
  );
};

exports.registerUser = registerUser;
exports.login = login;
