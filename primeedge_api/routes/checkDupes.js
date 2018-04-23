const checkDupes = (username, email, db) => {
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
        return {
          success: false,
          message: "Email address already in use."
        };
      } else {
        return {
          success: true,
          message: "Username and email are available."
        };
      }
    });
};

module.exports = checkDupes;
