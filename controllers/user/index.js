const UserModel = require("../../models/user");
const jwtUtils = require("../../utils/jwt");
const { validateEmail } = require("../../utils/validation");

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
  const user = new UserModel({
    nome,
    email,
    senha,
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
  const passwordIsCorrect = user ? user.senha === senha : false;

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
