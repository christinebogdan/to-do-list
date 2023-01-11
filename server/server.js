const express = require("express");
const bodyParser = require("body-parser");
const dbConnection = require("./database/connection");
const apiRouter = require("./routes/api");

// db connection
dbConnection();

// Server
const app = express();
app.use(bodyParser.json());
app.listen(8000);

// Routes
app.use("/api", apiRouter);
