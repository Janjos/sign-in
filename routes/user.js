const Controller = require("../controllers/user");

module.exports = [
  {
    method: "GET",
    path: "/users",
    handler: Controller.getAll,
  },
  {
    method: "POST",
    path: "/users",
    handler: Controller.save,
  },
];
