//creating a basic express server 🤠

require("dotenv").config({ path: "./config.env" });

require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectdb = require("./config/DataBase");
//error hamdler
const errorhandler = require("./middlewares/Errrormiddleware");

const Authroutes = require("./routes/Authroutes");
const Protectedroute = require("./routes/Protected");
connectdb();

const app = express();

//connect DB 💪

//Piece of the middleware that gonna allow us to get the data from the body
app.use(express.json());

app.use("/api/auth", Authroutes); //auth Rouets
app.use("/api/Private", Protectedroute); //Protected routes

app.use(errorhandler);

const Port = process.env.port || 5000;

const server = app.listen(Port, () => {
  console.log(`hello from the Port ${Port}`);
});

//handling the crashing of the server 🤦‍♂️

process.on("unhandledRejection", (err, Promise) => {
  console.log(`ERROR LOGGED: ${err}`);
  server.close(() => process.exit(1));
});

//Now Doing a Forgot Password and Reset Password
