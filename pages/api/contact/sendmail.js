let nodemailer = require("nodemailer");

export default function (req, res) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "qualyn.sender@gmail.com",
      pass: process.env.MAIL_PASSWORD,
    },
    secure: true,
  });

  const mailList = `${req.body.author_email}, qualyn.sender@gmail.com`;

  const mailData = {
    from: req.body.mail_email,
    to: mailList,
    subject: `Message From ${req.body.mail_author} - ${req.body.mail_email}`,
    text: req.body.mail_content,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      res
        .status(403)
        .json({ err: "Error occured while sending a message :" + err });
    } else {
      res.status(200).json(info);
    }
  });
}
