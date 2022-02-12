const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


const router = express.Router();


router.post("/", (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,

      
    // user: "Filmey.movies@gmail.com",
    // pass:"Filmey.movies123",


    },
  });

  const decoded = jwt.decode(req.body.token);

 const token = req.body.token;
  const email = decoded.email;

  var link = `http://localhost:1234/resetpassword/${token}`;
  link = link.toString()
  var mailOptions = {
    from: "Filmey.movies@gmail.com",
    to: email,
    subject: "Reset Password",
    text: "Reset your new password Using the link :" +`${link}`,
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
