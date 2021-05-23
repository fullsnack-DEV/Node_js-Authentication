const crypto = require("crypto");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
//creating a schema  //we have  to instantiouts
const Userschema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide Username"],
  },

  //schemas for Username , email and password

  email: {
    type: String,
    required: [true, "Plaese provide Email"],
    unique: true,
    match: [
      /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
      "Please Provide a Valid Email",
    ],
  },

  password: {
    type: String,
    required: [true, "Plaese provide Password"],
    minlength: 6,
    select: false,
  },
  resetpasswordtoken: String,
  resetpasswordExpire: Date,
});

//encrypting a Password
//using the bceyppt to hasing the password

//using the pre hook
Userschema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});
//This all are the instance Methods
Userschema.methods.Matchpasswords = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

//token method implementation
Userschema.methods.GetSignedtoken = function () {
  //Require id to verify the token
  //jwt.sign takes the couple of input
  //we need id
  // we need SECRET for the token
  // we can also pass the extra options

  return jwt.sign({ id: this._id }, process.env.SECRET_JWTTOKEN, {
    expiresIn: process.env.EXPIRES,
  });
};

//for Forgot Password
Userschema.methods.Getresetpasswordtoken = function () {
  //genrate a token for reset password
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.resetpasswordtoken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");

  this.resetpasswordExpire = Date.now() + 10 * (60 * 1000);

  return resettoken;
};

//Applying  a schema

const User = mongoose.model("User", Userschema);

module.exports = User;
