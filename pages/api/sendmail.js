import nodemailer from "nodemailer";
import sanitizeHtml from "sanitize-html";

export default function handler(req, res) {
  const transport = nodemailer.createTransport({
    port: 587,
    host: "mail.hitekredneck.io",
    auth: {
      user: process.env.FROM_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: false,
  });

  const { method, body } = req;
  const { note, valid } = body;
  if (method === "POST") {
    if (!valid) {
      return res.status(401).send("reCaptcha Not Valid");
    }
    const msg = sanitizeHtml(note.content, {
      allowedTags: [],
      allowedAttributes: {},
    });
    const mailData = {
      from: process.env.FROM_ADDRESS,
      to: note.email,
      bcc: "dave@hitekredneck.io",
      subject: `New Message from ${note.name}`,
      text: `This email was sent form an unmonitored account. Your message from https://hitekredneck.io  is below: \n ${msg}`,
      html: `<div><p>This email was sent form an unmonitored account. Your message from <a href="https://hitekredneck.io">https://hitekredneck.io</a> is below:</p><br /><p>${msg}</p></div>`,
    };

    transport.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(info);
      }
    });
    return res.status(200).send("Ok");
  } else {
    return res.status(404).send("Not Found");
  }
}
