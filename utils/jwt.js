const JWT = require("jsonwebtoken");
const UserController = require("../controllers/user");

const secret = "secret";

const validate = async (decoded) => {
  const user = await UserController.findById(decoded.id);
  const isValidUser = !!user;

  return { isValid: isValidUser };
};

const generateJWT = (obj) => JWT.sign(obj, secret);

module.exports = {
  generateJWT,
  validate,
  secret,
};
