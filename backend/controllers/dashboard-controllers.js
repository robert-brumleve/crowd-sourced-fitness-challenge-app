const { connection, port } = require("../db_connection");

const getUserChallenges = async (req, res, next) => {

    const sql = "SELECT * FROM users_has_challenges";

    connection.query(sql, (err, result) => {
        // console.log("testing works");
        if (result.length === 0) {
        return next(new Error("Challenges not found."));
        }
        if (err) {
        return next(new Error("Database error"));
        }
        res.json(result);
    });
    };

const getChallengesByUserId = async (req, res, next) => {
    const id = req.params.id;
    // const id = parseInt(req.params.id, 10);
    console.log("userID " + id);

    const sql = `SELECT uc.userID, uc.challengeID, c.name
    FROM users_has_challenges uc
    JOIN challenges c ON uc.challengeID = c.challengeID
    WHERE uc.userID = ?
    `;
    connection.query(sql, [id], (err, result) => {
        console.log("testing works");
        if (result.length === 0) {
        return next(new Error("Challenges not found."));
        }
        if (err) {
        return next(new Error("Database error"));
        }
        res.json(result);
    });
    };

exports.getChallengesByUserId = getChallengesByUserId;
exports.getUserChallenges = getUserChallenges;