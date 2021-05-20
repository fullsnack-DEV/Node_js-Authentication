const User = require("../Model/Users");

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

    res.status(201).json({
      //sending the user back
      success: true,
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      //catching the error
      success: false,
      message: err.message,
    });
  }
};
exports.Login = async (req, res, next) => {
  //getting the user data from body

  const { email, password } = req.body;

  //checking if email and password present
  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: "Please Provide the valid Email and Password",
    });
  }

  try {
    //we will check if user is present in a data base or not.
    //If he present then we gonna log him in otherwise we gonna through error to sign up krke

    //we can find the user on the basi of the email address bcz email is uniq
    const user = await User.findOne({ email }).select("+password");

    //if user no tpresent through error

    //If user is present then

    if (!user || !(await user.Matchpasswords(password))) {
      res.status(404).json({
        success: false,
        error: "Invalid Credentials",
      });
    }

    res.status(200).json({
      //sending the user back
      success: true,
      Token: "fjkfjvfi",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.forgotPassword = (req, res, next) => {
  res.json({
    message: "this is a forgot pass route",
  });
};

exports.resetPassword = (req, res, next) => {
  res.json({
    message: "this is a reset pass route",
  });
};
