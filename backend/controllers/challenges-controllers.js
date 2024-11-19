const { connection, port } = require("../db_connection");

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
  console.log("Request Body:", req.body);
  const { name, type, description, difficulty, creatorID, imageURL, tags } =
    req.body;

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

    // add new challenge if name is unique
    const sql = `INSERT INTO challenges (name, type, description, difficulty, creatorID, created_at, imageURL, tags)
     VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)`;
    const values = [
      name,
      type,
      description,
      difficulty,
      creatorID,
      imageURL,
      tags,
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
  });
};

// Retrieve a specific challenge by ID
const getChallengeById = async (req, res, next) => {
  const id = req.params.id;
  console.log("challengeId " + id);

  const sql = `SELECT challenges.*, users.username 
  FROM challenges
  JOIN users ON users.userID = challenges.creatorID
  WHERE challengeID = ?`;
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
  console.log("challengeID " + id);
  const { name, type, description, difficulty, creatorID, imageURL, tags } =
    req.body;
  const sql = `UPDATE challenges SET name=?,type=?, description=?, difficulty=?, creatorID=?, imageURL=?, tags=? WHERE challengeID=?`;
  const values = [
    name,
    type,
    description,
    difficulty,
    creatorID,
    imageURL,
    tags,
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

exports.getChallenges = getChallenges;
exports.createChallenge = createChallenge;
exports.getChallengeById = getChallengeById;
exports.deleteChallengeById = deleteChallengeById;
exports.updateChallenge = updateChallenge;
exports.searchChallenge = searchChallenge;
