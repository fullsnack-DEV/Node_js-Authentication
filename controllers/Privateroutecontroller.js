//Private Route controller

exports.Getprivateroute = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "you are on a Protected Route",
  });
};
