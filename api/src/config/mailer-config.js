const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'juanyancovich@gmail.com', // generated ethereal user
    pass: 'hmlgtzdvnjctwupl' // generated ethereal password
  }
})

transporter.verify().then(() => console.log('ready to send email'))

module.exports = transporter
