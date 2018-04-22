var request = require("supertest");
var expect = require("chai").expect;
var jwt = require("jsonwebtoken");
var config = require("../config");

describe("/submitLogin api route", function() {
  var server;
  beforeEach(function() {
    delete require.cache[require.resolve("../bin/www")];
    server = require("../bin/www");
  });
  afterEach(function(done) {
    server.close(done);
  });

  it("returns true if correct user/pw combo given", function testSubmitLogin(done) {
    request(server)
      .post("/submitLogin")
      .send({ username: "test1", password: "password" })
      .end(function(err, res) {
        expect(res.body.success).to.be.equal(true);
        done();
      });
  });

  it("returns JWT when correct user/pw given", function testSubmitLogin(done) {
    request(server)
      .post("/submitLogin")
      .send({ username: "test1", password: "password" })
      .end(function(err, res) {
        let token = res.body.token;
        let result;
        jwt.verify(token, config.secret, (err, decoded) => {
          if (err) {
            result = false;
          } else {
            result = true;
          }
        });
        expect(result).to.be.equal(true);
        done();
      });
  });

  it("returns false with message if username doesn't exist", function testSubmitLogin(done) {
    request(server)
      .post("/submitLogin")
      .send({ username: "nonexistant", password: "password" })
      .end(function(err, res) {
        expect(res.body.success).to.be.equal(false);
        expect(res.body.message).to.be.equal("Username or password incorrect.");
        done();
      });
  });

  it("returns false with message if password incorrect", function testSubmitLogin(done) {
    request(server)
      .post("/submitLogin")
      .send({ username: "test1", password: "badpass" })
      .end(function(err, res) {
        expect(res.body.success).to.be.equal(false);
        expect(res.body.message).to.be.equal("Username or password incorrect.");
        done();
      });
  });
});
