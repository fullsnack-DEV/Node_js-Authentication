const nodemailer = require("nodemailer");

const Sendemail = (options) => {
  //Import Transporter

  const transporter = nodemailer.createTransport({
    //it will take bunch of properties
    host: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //Mail options
  const mailOptions = {
    from: "Pratik Patre<hello@pratik.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //Sending mail
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = Sendemail;
