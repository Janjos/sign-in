/* eslint-disable no-restricted-syntax */
const UserModel = require("../../models/user");
const jwtUtils = require("../../utils/jwt");
const { hashPassword, comparePassword } = require("../../utils/crypto");
const {
  validateEmail,
  validatePhone,
  validateUserName,
  validateUserPassword,
} = require("../../utils/validation");

const findById = async (id) => {
  const user = await UserModel.findById(id);
  return user;
};

const getAll = async (request, h) => {
  const users = await UserModel.find({});
  return h.response({ data: users }).code(201);
};

const save = async (request, h) => {
  const { nome, email, senha, telefones } = request.payload;

  if (!validateEmail(email)) {
    return h
      .response({
        error: "email is invalid",
      })
      .code(400);
  }

  if (!validateUserName(nome)) {
    return h
      .response({
        error: "name is invalid",
      })
      .code(400);
  }

  for (const phone of telefones) {
    if (!validatePhone(phone)) {
      return h
        .response({
          error: "phone is invalid",
        })
        .code(400);
    }
  }

  if (!validateUserPassword(senha)) {
    return h
      .response({
        error: "password must have six or more characters",
      })
      .code(400);
  }

  const hasUserWithSameEmail = await UserModel.findOne({ email });
  if (hasUserWithSameEmail) {
    return comparePassword(senha, hasUserWithSameEmail.senha).then((result) => {
      if (result) {
        return h
          .response({
            error: "this email is already registered but password is correct",
          })
          .code(400);
      }
      return h
        .response({
          error: "this email is already registered",
        })
        .code(400);
    });
  }

  const cryptographedPassword = await hashPassword(senha).then(
    (cryptoPassword) => cryptoPassword
  );

  const user = new UserModel({
    nome,
    email,
    senha: cryptographedPassword,
    telefones,
  });

  await user.save();

  const response = {
    data: {
      ...user._doc,
    },
  };

  return h.response(response).code(201);
};

const login = async (request, h) => {
  const { email, senha } = request.payload;
  if (!validateEmail(email)) {
    return h.response({ error: "email is invalid" }).code(400);
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return h.response({ error: "user not found" }).code(500);
  }

  const passwordIsCorrect = await comparePassword(senha, user.senha).then(
    (result) => result
  );

  if (!passwordIsCorrect) {
    return h.response({ error: "email or password is wrong" }).code(400);
  }

  const statusCode = passwordIsCorrect ? 200 : 401;

  const jwt = {
    token: jwtUtils.generateJWT(
      {
        email: user.email,
      },
      {
        subject: user.id,
        expiresIn: "30m",
      }
    ),
  };

  await UserModel.updateOne({ _id: user._id }, { $set: { token: jwt.token } });

  const response = passwordIsCorrect ? jwt : "login failed";

  return h.response(response).code(statusCode);
};

module.exports.findById = findById;
module.exports.getAll = getAll;
module.exports.save = save;
module.exports.login = login;
