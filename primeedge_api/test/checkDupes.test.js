var request = require("supertest");
var expect = require("chai").expect;

describe("api routes", function() {
  var server;
  beforeEach(function() {
    delete require.cache[require.resolve("../bin/www")];
    server = require("../bin/www");
  });
  afterEach(function(done) {
    server.close(done);
  });

  it("returns data from DB with /checkDupes", function testDupeCheck(done) {
    request(server)
      .post("/checkDupes")
      .send({ username: "test", email: "test@email.com" })
      .end(function(err, res) {
        expect(res, true);
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  });

  it("returns false and message if user exists", function testDupeCheck(done) {
    request(server)
      .post("/checkDupes")
      .send({ username: "test1" })
      .end(function(err, res) {
        expect(res.message, "Username already exists.");
        expect(res.success, false);
        done();
      });
  });

  it("returns false and message if email exists", function testDupeCheck(done) {
    request(server)
      .post("/checkDupes")
      .send({ email: "test1@email.com" })
      .end(function(err, res) {
        expect(res.message, "Email address already in use.");
        expect(res.success, false);
        done();
      });
  });
});
