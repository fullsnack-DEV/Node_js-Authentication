const User = require("../Model/Users");

exports.Register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.Login = (req, res, next) => {
  res.json({
    message: "this is a login route",
  });
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
