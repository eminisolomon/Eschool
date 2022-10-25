const { isTokenValid } = require("../utils");
const CustomError = require("../errors");
const authenticateUser = async (req, res, next) => {
  // const token = req.signedCookies.token;
  // // console.log(token);
  // if (!token) {
  //   throw new CustomError.UnauthenticatedError("Invalid token provided");
  // }
  const AuthorizationHeader = req.headers.authorization;
  // console.log(AuthorizationHeader);
  if (!AuthorizationHeader || !AuthorizationHeader.startsWith("Bearer")) {
    // throw new CustomError.UnauthenticatedError("Invalid authentication xx");
    return res.status(401).json({ message: "No token value provided" });
  }
  const token = AuthorizationHeader.split(" ")[1];
  try {
    const { username, name, userId, role } = isTokenValid({ token });
    req.user = { username, name, userId, role };
    next();
  } catch (error) {
    // throw new CustomError.UnauthenticatedError("Invalid authentication x");
    return res.status(403).json({ message: "Wrong token value provided" });
  }
};
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      // throw new CustomError.UnauthorizedError(
      //   "Unauthorized to access this route"
      // );
      return res
        .status(401)
        .json({ message: "Only admins can access this resource" });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
