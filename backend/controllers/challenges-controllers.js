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
  const { name, description, difficulty, creatorID, imageURL } = req.body;

  // check if name is duplicate
  const checkName = "SELECT * FROM challenges WHERE name = ?";
  connection.query(checkName, [name], (checkErr, checkResult) => {
    if (checkErr) {
      return next(new Error("Database error during checking for duplicates"));
    }
    if (checkResult.length > 0) {
      return next(
        new Error(
          "Challenge name already exists. Please choose a different name."
        )
      );
    }

    // add new challenge if name is unique
    const sql = `INSERT INTO challenges (name, description, difficulty, creatorID, created_at, imageURL)
     VALUES (?, ?, ?, ?, NOW(), ?)`;
    const values = [name, description, difficulty, creatorID, imageURL];
    connection.query(sql, values, (err, result) => {
      if (err) {
        return next(new Error("Database error"));
      }
      res.status(201).json({
        message: "Challenge created successfully!",
        challengeID: result.insertId,
      });
    });
  });
};

const getChallengeById = async (req, res, next) => {
  const id = req.params.id;
  console.log("challengeId " + id);

  const sql = "SELECT * FROM challenges WHERE challengeID = ?";
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

// const getChallengesByUserId = async (req, res, next) => {
//   const uID = req.params.uID;
//   console.log("userId " + uID);

//   const sql = "SELECT * FROM challenges WHERE creatorID = ?";
//   connection.query(sql, [uID], (err, result) => {
//     if (result.length === 0) {
//       return next(new Error("User not found."));
//     }
//     if (err) {
//       return next(new Error("Database error"));
//     }
//     res.json(result);
//   });
// };

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

    connection.query("SELECT * FROM challenges", function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });
};

const updateChallenge = async (req, res, next) => {
  const id = req.params.id;
  console.log("challengeID " + id);
  const { name, description, difficulty, creatorID, imageURL } = req.body;
  const sql = `UPDATE challenges SET name=?, description=?, difficulty=?, creatorID=?, imageURL=? WHERE challengeID=?`;
  const values = [name, description, difficulty, creatorID, imageURL, id];
  connection.query(sql, values, (err, result) => {
    if (err) {
      // if (err.code === "ER_DUP_ENTRY") {
      //   return next(
      //     new Error(
      //       "Challenge name already exists. Please choose a different name."
      //     )
      //   );
      // }
      console.error("Database error:", err);
      return next(err);
    }
    if (result.affectedRows === 0) {
      return next(new Error("Challenge not found"));
    }
    res.status(201).json({
      message: `Challenge ${id} updated successfully!`
    });
  });
};

exports.getChallenges = getChallenges;
exports.createChallenge = createChallenge;
exports.getChallengeById = getChallengeById;
// exports.getChallengesByUserId = getChallengesByUserId;
exports.deleteChallengeById = deleteChallengeById;
exports.updateChallenge = updateChallenge;
