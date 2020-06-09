const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  nome: String,
  email: String,
  senha: String,
  telefones: [
    {
      numero: Number,
      ddd: Number,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
