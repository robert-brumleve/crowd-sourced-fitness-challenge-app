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
    console.log("Chalenges for userID " + id);

    const sql = `SELECT uc.userID, uc.challengeID, c.name, c.imageURL
    FROM users_has_challenges uc
    JOIN challenges c ON uc.challengeID = c.challengeID
    WHERE uc.userID = ?
    `;
    connection.query(sql, [id], (err, result) => {
        // console.log("challenge testing works");
        if (result.length === 0) {
        return next(new Error("Challenges not found."));
        }
        if (err) {
        return next(new Error("Database error"));
        }
        res.json(result);
    });
    };

const updateUserHasChallenges = async (req, res, next) => {
    const uid = req.params.uid;
    const cid = req.params.cid;

    console.log("Update badge completion for userID " + uid + cid);
    const { completed } = req.body;

    const sql = `UPDATE users_has_challenges SET completed=? WHERE userID=? AND challengeID=?`;

    // const sql = `SELECT * FROM users_has_challenges WHERE userID = ? AND challengeID = ?`;
    // connection.query(sql, [userid, challengeid], (err, result) => {
    //     console.log("badge testing works");

    //     if (result.length === 0) {
    //       return next(new Error("Challenge not found."));
    //     }
    //     if (err) {
    //       return next(new Error("Database error"));
    //     }
    //     res.json(result);
    //   });
    // };
    const values = [
        completed,
        uid,
        cid
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
        message: `User's challenges for ${uid} updated successfully!`,
        });
    });
    };


const getBadgesByUserId = async (req, res, next) => {
        const id = req.params.id;
        console.log("Badges for userID " + id);

        const sql = `SELECT uc.userID, uc.challengeID, c.badgeName
        FROM users_has_challenges uc
        JOIN challenges c ON uc.challengeID = c.challengeID
        WHERE uc.userID = ? && uc.completed = 1
        `;

        connection.query(sql, [id], (err, result) => {
            // console.log("badge testing works");
            if (result.length <= 0) {
            return next(new Error("Badges not found."));
            }
            if (err) {
            return next(new Error("Database error"));
            }
            res.json(result);
        });
        };

exports.getChallengesByUserId = getChallengesByUserId;
exports.getUserChallenges = getUserChallenges;
exports.getBadgesByUserId = getBadgesByUserId;
exports.updateUserHasChallenges = updateUserHasChallenges;