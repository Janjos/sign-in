const UserHandlers = require("./controllers/user");

module.exports = [
  {
    method: "GET",
    path: "/users",
    handler: UserHandlers.getAll,
  },
  {
    method: "POST",
    path: "/users",
    handler: UserHandlers.save,
  },
];
