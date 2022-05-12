const { userPayment } = require('../db')

async function getAllPayments () {
  return await userPayment.findAll()
}

async function createPayment (data) {
  // VERIFICAR que nombres de parámetros coincidan con los del modelo Payment de la DB
  const { cardNumber, expirationDate, provider } = data

  return await userPayment.findOrCreate({
    where: {
      cardNumber,
      expirationDate,
      provider
    }
  })
}

async function removePayment (paymentId) {
  return await userPayment.destroy({
    where: { id: paymentId }
  })
}

module.exports = {
  getAllPayments,
  createPayment,
  removePayment
}
