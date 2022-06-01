const transporter = require('../config/mailer-config')

const sendmail = async (req, res) => {
  const { email } = req.body
  try {
    if (!email) { res.status(400).json({ data: null, message: 'No ha ingresado un email' }) } else {
      const info = await transporter.sendMail({
        from: 'SalchiStore Newsletter" <juanyancovich@gmail.com>',
        to: email,
        subject: 'Bienvenido a SalchiStore Newsletter!',
        text: 'Hello world?', // plain text body
        html:
        `<style>
          h1 {
          color: black;
          font-family: Segoe UI Symbol;
          font-size: 300%;}
          p{
          color: black;
          font-family: verdana;
          font-size: 400%;}
          
        </style>

        <h1 > Bienvenido ${email.split('@')[0]} al Newsletter de SalchiStore😎 </h1>
        <p> Aqui recibiras las ultimas novedades acerca de nuestro productos, como también ofertas y descuentos!  </p>
        <br>
        <img width='500px' src='https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'/>` // html body
      })
      return res.status(200).json({ data: info, message: 'El Email ha sido enviado con exito' })
    }
  } catch (error) {
    return res.status(400).json({ message: 'Somethin went wrong!' })
  }
}

module.exports = {
  sendmail
}
