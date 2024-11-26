<<<<<<< HEAD
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "oreximus@gmail.com",
    pass: "x8qganUP/inN7ZyfsBh0Dw==",
  },
});

module.exports = {
  transporter,
};
=======
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "oreximus@gmail.com",
    pass: "x8qganUP/inN7ZyfsBh0Dw==",
  },
});

module.exports = {
  transporter,
};
>>>>>>> master
