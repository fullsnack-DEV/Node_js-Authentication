const Crypto = require("crypto");
const User = require("../Model/Users");
const ErrorResponse = require("../Utils/errorResponse");
const SendEmail = require("../Utils/Sendemail");

exports.Register = async (req, res, next) => {
  //getting the data from the body
  const { username, email, password } = req.body;

  try {
    //creating thr user using the Schema

    const user = await User.create({
      username,
      email,
      password,
    });

    // res.status(201).json({
    //   //sending the user back
    //   success: true,
    //   user: user,
    //imsted of sending the above response twice. we are mwking the function for it so that we can use it in different places
    sendtoken(user, 201, res);

    // });
  } catch (err) {
    next(err);
  }
};
exports.Login = async (req, res, next) => {
  //getting the user data from body

  const { email, password } = req.body;

  //checking if email and password present
  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide the email and Password", 401)
    );
  }

  try {
    //we will check if user is present in a data base or not.
    //If he present then we gonna log him in otherwise we gonna through error to sign up krke

    //we can find the user on the basi of the email address bcz email is uniq
    const user = await User.findOne({ email }).select("+password");

    //if user no tpresent through error

    //If user is present then

    if (!user || !(await user.Matchpasswords(password))) {
      return next(new ErrorResponse("Invalid credentials", 404));
    }

    sendtoken(user, 200, res);
  } catch (error) {
    next(error);
  }
};
exports.forgotPassword = async (req, res, next) => {
  //Steps To implement a Forgot PAssword
  //1--> We gonna get the email from the body
  //destructuring

  try {
    //First check if user exists in dB or not
    const user = await User.findOne({ email: req.body.email });

    //If not Found

    if (!user) {
      return next(new ErrorResponse("Email Could not be sent", 404));
    }

    //If Found
    const resettoken = user.Getresetpasswordtoken(); //saving the reset token to the user schema
    await user.save();

    //reset Url

    const reseturl = `http://localhost:3000/passwordreset/${resettoken}`;

    const message = `<h1> You have requsted Password Reset  </h1>
                    <p> Please got to this link to reset your password  </p>
                    <a href=${reseturl} clicktracking=off >${reseturl} </a>`;

    try {
      await SendEmail({
        email: user.email,
        subject: "Your Password reset token",
        message,
      });

      res.status(200).json({
        status: "success",
        message: "Token sent to email ",
      });
    } catch (error) {
      user.resetpasswordtoken = undefined;
      user.resetpasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not sent", 500));
    }

    console.log(user);
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  //reacreate the token
  const resetpasswordtoken = Crypto.createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetpasswordtoken,
      resetpasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("invalid reset token", 400));
    }

    user.password = req.body.password;
    user.resetpasswordtoken = undefined;
    user.resetpasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Passwors change succssfuly",
      token: user.GetSignedtoken(),
    });
  } catch (error) {
    next(err);
  }
};

//to send the token to the user

const sendtoken = (user, statusCode, res) => {
  const token = user.GetSignedtoken(); //getting token via a schema method
  res.status(statusCode).json({ success: true, token });
};
