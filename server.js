/* eslint-disable global-require */

require("dotenv").config();
require("./database/mongo");
const Hapi = require("@hapi/hapi");
const routes = require("./routes/user");
const jwtUtils = require("./utils/jwt");

const { SERVER_PORT } = process.env;

const init = async (serverPort = SERVER_PORT) => {
  const server = Hapi.server({
    port: serverPort,
    host: "localhost",
  });

  await server.register(require("hapi-auth-jwt2"));
  server.auth.strategy("jwt", "jwt", {
    key: jwtUtils.secret,
    validate: jwtUtils.validate,
  });

  server.auth.default("jwt");

  server.route(routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);

  return server;
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

module.exports = init;
