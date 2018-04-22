var request = require("supertest");
var expect = require("chai").expect;
var bcrypt = require("bcryptjs");

describe("/saveUser api route", function() {
  var server;
  beforeEach(function() {
    delete require.cache[require.resolve("../bin/www")];
    server = require("../bin/www");
  });
  afterEach(function(done) {
    server.close(done);
  });

  it("hashes password sent to route", function testSaveUser(done) {
    request(server)
      .post("/saveUser")
      .send({
        username: "newuser",
        password: "password",
        email: "newguy@email.com"
      })
      .end(function(err, res) {
        expect(res.body.success).to.be.equal(true);
        done();
      });
  });
});
