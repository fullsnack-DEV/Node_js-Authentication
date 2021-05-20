//creating a basic express server

require("dotenv").config({ path: "./config.env" });

const express = require("express");

const app = express();

const Port = process.env.port || 3000;

app.listen(Port, () => {
  console.log("hello");
});
