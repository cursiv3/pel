const routes = require("express").Router();
const promise = require("bluebird");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const options = {
  promiseLib: promise
};
const pgp = require("pg-promise")(options);
const db = pgp(config.database);

routes.get("/", (req, res) => {
  res.send("api server functioning");
});

// ****************************************************************************
//  check for duplicate entry on registration
// ****************************************************************************
routes.post("/checkDupes", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;

  db
    .task("check-dupes", async DB => {
      return [
        await DB.oneOrNone(`SELECT username FROM users WHERE username = $1`, [
          username
        ]),
        await DB.oneOrNone(`SELECT email FROM users WHERE email = $1`, [email])
      ];
    })
    .then(userList => {
      if (userList[0] != null) {
        res.json({ success: false, message: "Username already exists." });
      } else if (userList[1] != null) {
        res.json({
          success: false,
          message: "Email address already in use."
        });
      } else {
        res.json({
          success: true,
          message: "Username and email are available."
        });
      }
    });
});

// ****************************************************************************
//  save user to database
// ****************************************************************************

routes.post("/saveUser", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let saltRounds = 10;

  bcrypt.hash(req.body.password, saltRounds, (err, hashPass) => {
    db
      .none("INSERT INTO users(username, pword, email) VALUES($1, $2, $3)", [
        username,
        hashPass,
        email
      ])
      .then(data => {
        console.log("User saved successfully!");
        res.json({
          success: true,
          message: "user submitted"
        });
      })
      .catch(error => {
        res.json({ success: false, err: error });
      });
  });
});

// ****************************************************************************
// login submit
// ****************************************************************************
routes.post("/submitLogin", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  db
    .any("SELECT * FROM users WHERE username = $1", [username])
    .then(user => {
      if (user.length < 1) {
        res.json({
          success: false,
          message: "User does not exist."
        });
      } else {
        var usr = user[0].username;
        var hashPass = user[0].pword;

        bcrypt.compare(password, hashPass, (err, doesPwMatch) => {
          if (doesPwMatch != true || usr != username) {
            res.json({
              success: false,
              message: "Username or password incorrect."
            });
          } else {
            const payload = { user: usr };
            var token = jwt.sign(payload, config.secret, {
              expiresIn: 60 * 60 * 24
            });
            console.log("Successfully created token!");
            res.json({ success: true, message: "Token created", token: token });
          }
        });
      }
    })
    .catch(error => {
      res.json({ success: false, err: error });
    });
});

module.exports = routes;
