const UserModel = require("../models/user");

const getAll = async (request, h) => {
  const users = await UserModel.find({});
  return h.response({ data: users }).code(201);
};

const save = async (request, h) => {
  const { nome, email, senha, telefones } = request.payload;
  const user = new UserModel();
  user.nome = nome;
  user.email = email;
  user.senha = senha;
  user.telefones = telefones;

  await user.save();
  return h.response({ data: user }).code(201);
};

module.exports.getAll = getAll;
module.exports.save = save;
