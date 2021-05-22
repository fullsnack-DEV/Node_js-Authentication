const jwt = require("jsonwebtoken");
//error handler
const ErrorResponse = require("../Utils/errorResponse");
const User = require("../Model/Users");
//exporting a protected routed
exports.Protected = async (req, res, next) => {
  //1>if token is present on a header or not
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //if token is present then take that token
    token = req.headers.authorization.split(" ")[1]; //what is this?

    //so Our headers gonna look  something like this
    //"Bearer dkjfhkdshyiufsyksdhfkshfkshsiuyfihfksdhfiusfhksdhfskjdjfhskuhyfuskhf"

    //we only need  the token so that why .split(" ")[1]
  }

  if (!token) {
    //throw the error
    return next(new ErrorResponse("Not authrized to access this route", 401));
  }

  //If at this stage we find the token then we will vetrify the token
  try {
    console.log(token);
    const decoded = jwt.verify(token, process.env.SECRET_JWTTOKEN);

    //we will again find the user with help of the id
    const user = await User.findById(decoded.id);
    console.log(`i am user ${user}`);
    //if user not found
    if (!user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    //adding user on req
    req.user = user;

    //calling next
    console.log("i am here");
    next();
  } catch (error) {
    return next(
      new ErrorResponse("Not Authrized to access this particular route", 401)
    );
  }
};
