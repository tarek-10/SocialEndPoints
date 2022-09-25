const nodemailer = require("nodemailer");

const senEmail = async (dest, message) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER_SENDER, // generated ethereal user
      pass: process.env.USER_PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"tarek mohamed 👻" <tarek@gmail.com>', // sender address
    to: dest, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: message, // html body
  });
};

module.exports = senEmail;
