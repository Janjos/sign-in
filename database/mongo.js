const mongoose = require("mongoose");

const { DB_HOST, DB_NAME, DB_PORT } = process.env;

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
