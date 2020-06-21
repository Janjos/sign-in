/* eslint-disable no-multi-assign */
const Lab = require("@hapi/lab");
const { expect } = require("@hapi/code");
const jwtUtils = require("../utils/jwt");

const {
  afterEach,
  beforeEach,
  describe,
  it,
  test,
} = (exports.lab = Lab.script());
const init = require("../server");

const SERVER_TEST_PORT = 3001;

describe("GET /users", () => {
  let server;

  beforeEach(async () => {
    server = await init(SERVER_TEST_PORT);
  });

  afterEach(async () => {
    await server.stop();
  });

  test("with no authentication token", () => {
    it("responds with 404", async () => {
      const res = await server.inject({
        method: "get",
        url: "/",
      });
      expect(res.statusCode).to.equal(404);
    });
  });

  test("with invalid authentication token", () => {
    it("responds with 401", async () => {
      const res = await server.inject({
        method: "get",
        url: "/",
        Auth: "invalid.token",
      });
      expect(res.statusCode).to.equal(401);
    });
  });

  test("with valid authentication token", () => {
    it("responds with 201", async () => {
      const res = await server.inject({
        method: "get",
        url: "/",
        Auth: jwtUtils.generateJWT(
          {
            email: "email@email.com",
          },
          {
            subject: "01",
            expiresIn: "1m",
          }
        ),
      });
      expect(res.statusCode).to.equal(201);
    });
  });
});
