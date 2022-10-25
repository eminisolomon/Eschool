
const Error = require("../errors");

const authorizeUser = (currentUser, currentUserId) => {
  if (currentUser.userId === currentUserId.toString()) return;
  throw new Error.UnauthorizedError(
    "You are not authorized to access these resource"
  );
};

module.exports = authorizeUser;