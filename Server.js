//creating a basic express server

require("dotenv").config({ path: "./config.env" });

const express = require("express");

const app = express();

const Authroutes = require("./routes/Authroutes");

//Piece of the middleware that gonna allow us to get the data from the body
app.use(express.json());

app.use("/api/auth", Authroutes);

const Port = process.env.port || 5000;

app.listen(Port, () => {
  console.log("hello");
});
