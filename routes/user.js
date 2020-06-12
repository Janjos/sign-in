const Controller = require("../controllers/user");

module.exports = [
  {
    method: "GET",
    path: "/users",
    config: { auth: "jwt" },
    handler: Controller.getAll,
  },
  {
    method: "POST",
    path: "/users",
    config: { auth: false },
    handler: Controller.save,
  },
  {
    method: "POST",
    path: "/users/login",
    config: { auth: false },
    handler: Controller.login,
  },
];
