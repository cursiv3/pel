const request = require("supertest");
const expect = require("chai").expect;
const config = require("../config");

describe("/submitRegistration api route", function() {
  var server;
  beforeEach(function() {
    delete require.cache[require.resolve("../bin/www")];
    server = require("../bin/www");
  });
  afterEach(function(done) {
    server.close(done);
  });

  it("denies access with 403 without access code", function testSaveUserDeny(done) {
    request(server)
      .post("/submitRegistration")
      .send({
        username: "newuser",
        password: "password",
        email: "newguy@email.com"
      })
      .end(function(err, res) {
        expect(res.status).to.be.equal(403);
        expect(res.body.message).to.be.equal("Access denied.");
        done();
      });
  });
});
