exports.Register = (req, res, next) => {
  res.json({
    message: "this is a register route",
  });
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
