const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Filmey.movies@gmail.com",
      pass: "Filmey.movies123",
    },
  });


  var link = `http://localhost:1234/resetpassword/${req.body.userId}`;
  link = link.toString()
  var mailOptions = {
    from: "Filmey.movies@gmail.com",
    to: req.body.email,
    subject: "Reset Password",
    html:  link,

    // text: `http://localhosst:1234/resetpassword/${req.body.userId}`,
  
    // html:   "<p>Reset your new password Using the link</p> <a href='link'>Reset Password Link</a>"
    // '<p>Reset your new password Using the link </p><a href=`http://localhost:1234/resetpassword/${req.body.id}`>Reset Password Link</a>'
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email is sent");
      return true;
    }
  });
});

module.exports = router;
