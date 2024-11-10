require("dotenv").config();
const mysql = require("mysql");
const port = process.env.PORT || 5000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // socketPath: process.env.DB_SOCKET_PATH,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
});

module.exports = { connection, port };

// const sql = require("mssql");
// require("dotenv").config();

// (async () => {
//   try {
//     // make sure that any items are correctly URL encoded in the connection string
//     await sql.connect(
//       `Server=${process.env.DB_HOST},1433;Database=${process.env.DB_DATABASE};User Id=${process.env.DB_USER};Password=${process.env.DB_PASSWORD};Encrypt=true;TrustServerCertificate=True;`
//     );
//     // const result = await sql.query`select * from mytable where id = ${value}`
//     // console.dir(result)
//   } catch (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }
// })();

// module.exports = { sql };
