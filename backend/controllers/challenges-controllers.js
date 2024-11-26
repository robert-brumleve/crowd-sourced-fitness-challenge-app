const { connection, port } = require("../db_connection");
// Set up Google Cloud Storage
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
  keyFilename: "./key.json",
});
const bucket = storage.bucket("csfca");

const getChallenges = async (req, res, next) => {
  sql = "SELECT * FROM challenges";
  connection.query(sql, (err, result) => {
    if (err) {
      return next(err);
    }
    return res.json(result);
  });
};

const createChallenge = async (req, res, next) => {
  const {
    name,
    type,
    description,
    difficulty,
    creatorID,
    tags,
    badgeName,
    badgeURL,
  } = req.body;


  console.log("req.body: ", req.body);
  //handle image
  let imageURL;
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
    imageURL = publicUrl;
  } else {
    imageURL = null;
  }

  // check if name is duplicate
  const checkName = "SELECT * FROM challenges WHERE name = ?";
  connection.query(checkName, [name], (checkErr, checkResult) => {
    if (checkErr) {
      return next(new Error("Database error during checking for duplicates"));
    }
    console.log("check Result", checkResult);
    if (checkResult.length > 0) {
      return next(new Error("Challenge name already exists"));
    }
  });

  // add new challenge if name is unique
  const sql = `INSERT INTO challenges (name, type, description, difficulty, creatorID, created_at, imageURL, tags, badgeName, badgeURL)
     VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?)`;
  const values = [
    name,
    type,
    description,
    difficulty,
    creatorID,
    imageURL,
    tags,
    badgeName,
    badgeURL,
  ];
  connection.query(sql, values, (insertError, result) => {
    if (insertError) {
      console.error("Error inserting challenge:", insertError);
      return next(new Error("Database error"));
    }
    res.status(201).json({
      message: "Challenge created successfully!",
      challengeID: result.insertId,
    });
  });
};

// Retrieve a specific challenge by ID
const getChallengeById = async (req, res, next) => {
  const id = req.params.id;
  console.log("challengeId " + id);

  const sql = `SELECT challenges.*, users.username
  FROM challenges
  JOIN users ON users.userID = challenges.creatorID
  WHERE challengeID = ?
  `;
  connection.query(sql, [id], (err, result) => {
    if (result.length === 0) {
      return next(new Error("Challenge not found."));
    }
    if (err) {
      return next(new Error("Database error"));
    }
    res.json(result);
  });
};

const deleteChallengeById = async (req, res, next) => {
  //string stype to int
  const id = parseInt(req.params.id, 10);

  console.log("Deleting challenge with ID:", id);

  const sql = "DELETE FROM challenges WHERE challengeID = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      return next(new Error("Deleting challenge failed"));
    }
    if (result.affectedRows === 0) {
      return next(new Error("Challenge not found"));
    }

    // Get updated list of challenges after deletion
    connection.query("SELECT * FROM challenges", function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });
};

// update the challenge with the provided values
const updateChallenge = async (req, res, next) => {
  const id = req.params.id;
  console.log("type of id", typeof id);
  console.log("challengeID " + id);
  // if (!req.body || Object.keys(req.body).length === 0) {
  //   return res.status(400).json({ message: "Request body is empty" });
  // }
  let {
    name,
    type,
    description,
    difficulty,
    creatorID,
    // imageURL,
    tags,
    badgeName,
    badgeURL,
  } = req.body;
  console.log("req.body", req.body);
  console.log("req.body keys:", Object.keys(req.body));
  let imageURL;
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
    imageURL = publicUrl;
  } else {
    imageURL = null;
  }
  const sql = `UPDATE challenges SET name=?,type=?, description=?, difficulty=?, creatorID=?, imageURL=?, tags=?, badgeName=?, badgeURL=? WHERE challengeID=?`;
  const values = [
    name,
    type,
    description,
    difficulty,
    creatorID,
    imageURL,
    tags,
    badgeName,
    badgeURL,
    id,
  ];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return next(err);
    }
    if (result.affectedRows === 0) {
      return next(new Error("Challenge not found"));
    }
    res.status(201).json({
      message: `Challenge ${id} updated successfully!`,
    });
  });
};

const searchChallenge = async (req, res, next) => {
  const key = req.params.keywords;
  console.log("Key words:  " + key);

  const sql =
    "SELECT * FROM challenges WHERE name LIKE ? OR description LIKE ?";
  const keyword = `%${key}%`;
  connection.query(sql, [keyword, keyword], (err, result) => {
    if (result.length === 0) {
      return next(new Error("Challenge not found."));
    }
    if (err) {
      return next(new Error("Database error"));
    }
    res.json(result);
  });
};

//get list of challngeID that has users joined
const challengeWithUser = async (req, res, next) => {
  const sql = "SELECT challengeID FROM users_has_challenges";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetgettingching challenge data:", err.message);
      return res.status(500).json({ error: "Failed to get challenges" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "No challenges found" });
    }
    return res.status(200).json(result);
  });
};

const joinChallenge = async (req, res, next) => {
  console.log("Request Info:", req.body);
  const { userID, challengeID, completed } = req.body;
  // add new challenge if name is unique
  const sql = `INSERT INTO users_has_challenges (userID, challengeID, completed)
     VALUES (?, ?, 0)`;
  const values = [userID, challengeID, completed];
  connection.query(sql, values, (insertError, result) => {
    if (insertError) {
      console.error("Error inserting challenge:", insertError);
      return next(new Error("Database error"));
    }
    res.status(201).json({
      message: "Challenge joined successfully!",
      challengeID: result.insertId,
    });
  });
};

exports.getChallenges = getChallenges;
exports.createChallenge = createChallenge;
exports.getChallengeById = getChallengeById;
exports.deleteChallengeById = deleteChallengeById;
exports.updateChallenge = updateChallenge;
exports.searchChallenge = searchChallenge;
exports.joinChallenge = joinChallenge;
exports.challengeWithUser = challengeWithUser;
