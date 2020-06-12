const JWT = require("jsonwebtoken");
const UserController = require("../controllers/user");

const secret = "secret";

const validate = async (decoded) => {
  const user = await UserController.findById(decoded.sub);
  const isValidUser = !!user;

  return { isValid: isValidUser };
};

const generateJWT = (obj, options = {}) => JWT.sign(obj, secret, options);

module.exports = {
  generateJWT,
  validate,
  secret,
};
