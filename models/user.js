const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    nome: String,
    email: String,
    senha: String,
    telefones: [
      {
        numero: Number,
        ddd: Number,
      },
    ],
    token: String,
  },
  {
    timestamps: {
      data_criacao: "created_at",
      data_atualizacao: "updated_at",
      ultimo_login: "created_at",
    },
  }
);

module.exports = mongoose.model("User", UserSchema);
