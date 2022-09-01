var express = require("express");
var path = require("path");
const authRouter = require("./routes/auth.route");
const fileRouter = require("./routes/file.route");
const db = require("./config/db");
const cors = require("cors");

var logger = require("morgan");

var app = express();

// app.use(cors());
app.use(logger("dev"));
app.use(express.json());

db();

app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // FIX: below code fixes app crashing on refresh in deployment
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Grid FS" });
  });
}

// error handler
app.use(function (req, res) {
  res.status(400).send("Error to route");
});

module.exports = app;
