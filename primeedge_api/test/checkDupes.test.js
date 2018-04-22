var request = require("supertest");
var expect = require("chai").expect;

describe("/checkDupes api route", function() {
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
        expect(res.body.success).to.be.equal(true);
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  });

  it("returns false and message if user exists", function testDupeCheck(done) {
    request(server)
      .post("/checkDupes")
      .send({ username: "test1" })
      .end(function(err, res) {
        expect(res.body.message).to.be.equal("Username already exists.");
        expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it("returns false and message if email exists", function testDupeCheck(done) {
    request(server)
      .post("/checkDupes")
      .send({ email: "test1@email.com" })
      .end(function(err, res) {
        expect(res.body.message).to.be.equal("Email address already in use.");
        expect(res.body.success).to.be.equal(false);
        done();
      });
  });
});
