const express = require('express');
const mysql = require('mysql');
const cors = require("cors");

const PORT = process.env.PORT || 5050;
// const PORT = 5050;
const app = express();
app.use(express.json());
app.use(cors());

// Connect to sql database, may need to move to a separate file
const db = mysql.createConnection ({
    host: '99.106.34.153',
    user: 'csfca',
    password: 'sIvenTaIDE2024',
    database: 'csfca'
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get('/challenges', (req, res) => {
    const sql = 'SELECT * from challenges';
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.listen(PORT, () => {
    console.log("listening");
});