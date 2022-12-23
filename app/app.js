require("dotenv").config("../.env");
const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public/uploads")));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/", require("../routes/routes"));

module.exports = app;
