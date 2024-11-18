// const {connection, port} = require('./db_connection');
require("dotenv").config();
const port = process.env.PORT || 5000;

const express = require("express");

const cors = require("cors");
const session = require("express-session");

const challengesRoutes = require("./routes/challenges-routes");
const accountRoutes = require("./routes/account-routes"); // Importing the new account routes

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "roantayo",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/challenges", challengesRoutes);
app.use("/", accountRoutes);

app.use((req, res, next) => {
  const error = new Error("Could not find this route.");
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error occured!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
