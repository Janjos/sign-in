/* eslint-disable no-multi-assign */
const Lab = require("@hapi/lab");
const { expect } = require("@hapi/code");

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
});
