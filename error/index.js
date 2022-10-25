
const BadRequestError = require("./badRequest");
const UnauthorizedError = require("./Unauthorized");
const UnauthenticatedError = require("./Unauthenticated");
const CustomError = require("./CustomError");
const NotFoundError = require("./notFound");

module.exports = {
  BadRequestError,
  CustomError,
  UnauthenticatedError,
  UnauthorizedError,
  NotFoundError,
};