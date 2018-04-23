const config = require("../config");
function mailerOptionsSetup(userToken, userEmail) {
  return {
    from: "Prime Edge Lab <corey.lewispdx@gmail.com>",
    to: "lewisc503@gmail.com",
    subject: "Prime Edge Lab Account Authentication",
    html: `<h1>Complete your sign up!</h1>
        <img src='../pelLogo.png' alt='prime edge lab logo'>
        <a href="http://${
          config.apiUrl
        }/verifyEmail?token=${userToken}?id=${userEmail}"> 
          Click this link to verify your email address!
        </a>`
  };
}

module.exports = mailerOptionsSetup;
