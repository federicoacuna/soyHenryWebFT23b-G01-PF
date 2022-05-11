// VERIFICAR que el nombre del modelo Payment coincida con el de la DB
const { Payment } = require('../db')

async function getAllPayments (useriD) {
  return await Payment.findByPk(useriD)
}

async function createPayment (data) {
  // VERIFICAR que nombres de parámetros coincidan con los del modelo Payment de la DB
  const { cardNumber, expirationDate, provider } = data

  return await Payment.findOrCreate({
    where: {
      cardNumber,
      expirationDate,
      provider
    }
  })
}

async function removePayment (paymentId) {
  return await Payment.destroy({
    where: { id: paymentId }
  })
}

module.exports = {
  getAllPayments,
  createPayment,
  removePayment
}
