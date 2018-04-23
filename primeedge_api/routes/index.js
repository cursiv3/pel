const routes = require("express").Router();
const promise = require("bluebird");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const config = require("../config");
const mailerOptionsSetup = require("../mailerOptionsSetup");

const options = {
  promiseLib: promise
};
const pgp = require("pg-promise")(options);
const db = pgp(config.database);

routes.get("/", (req, res) => {
  res.send("api server functioning");
});

// ****************************************************************************
//  submit registration
// ****************************************************************************

// ****************************************************************************
//  check for duplicate entry on registration
// ****************************************************************************
routes.post("/submitRegistration", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  // check for duplicate data
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
          status: 400,
          success: false,
          message: "Email address already in use."
        });
      } else {
        let saltRounds = 10;

        bcrypt.hash(req.body.password, saltRounds, (err, hashPass) => {
          db
            .none(
              "INSERT INTO users(username, passwd, email, verified) VALUES($1, $2, $3, $4)",
              [username, hashPass, email, false]
            )
            .then(data => {
              res.json({
                status: 200,
                success: true,
                message: "user submitted"
              });
            })
            .catch(error => {
              res.json({ status: 500, success: false, err: error.message });
            });

          // send verification email with JWT
          const payload = { user: username };
          var token = jwt.sign(payload, config.secret, {
            expiresIn: 86400
          });

          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: config.mailerEmail,
              pass: config.mailerPW
            }
          });

          let mailOptions = mailerOptionsSetup(token, email);

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              res.status(500);
              res.send(err);
            } else {
              res.json({ status: 200, message: "Verification email sent." });
            }
          });
        });
      }
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
          message: "Username or password incorrect."
        });
      } else {
        var usr = user[0].username;
        var hashPass = user[0].passwd;

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
            res.json({ success: true, message: "Token created", token: token });
          }
        });
      }
    })
    .catch(error => {
      res.json({ success: false, err: error });
    });
});

// ****************************************************************************
//  verify user email account
// ****************************************************************************

routes.get("/verifyEmail", (req, res) => {
  const allParams = req.query.token;
  const token = `${allParams.match(/.+?(?=\?)/)}`;
  const userEmail = `${allParams.match(/[^=]+$/)}`;

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          status: 401,
          success: false,
          message: "Authentication failed.",
          error: err
        });
      } else {
        db.none(
          `UPDATE users SET verified = true WHERE email = '${userEmail}'`
        );
        res.json({ status: 200, success: true, message: "Email verified." });
      }
    });
  } else {
    res.json({ success: false, message: "No authentication provided." });
  }
});

// deletes account that gets created when tests run
routes.delete("/test/delTestUser", (req, res) => {
  db.none("DELETE FROM users WHERE username = 'newuser'").then(d => {
    res.status(200);
    res.json({ status: 200, message: "delete done" });
  });
});

routes.get("/test/createTestTable", (req, res) => {
  let saltRounds = 10;
  bcrypt.hash(config.testPass, saltRounds, (err, hashPass) => {
    db
      .task("create test table", async DB => {
        return [
          await DB.none(
            `DROP TABLE IF EXISTS test_users;
            CREATE TABLE test_users(
        id SERIAL NOT NULL PRIMARY KEY,
        username TEXT,
        passwd TEXT,
        email TEXT,
        register_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        last_update TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );`
          ),
          await DB.none(
            `INSERT INTO test_users (username, passwd, email) VALUES ('test1', '${hashPass}', 'test1@email.com');`
          )
        ];
      })
      .then(res.status(200))
      .then(res.json({ message: "success" }));
  });
});

// ********************************************************************
//                      END UNPROTECTED ROUTES
// ********************************************************************

// ================== MIDDLEWARE verify token =========================
routes.use((req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401);
        res.json({ success: false, message: "Authentication failed." });
      } else {
        req.decoded = decoded;
        res.json({ success: true });
      }
    });
  } else {
    res.status(403);
    res.json({ success: false, message: "No authentication provided." });
  }
});

module.exports = routes;
