const { userPayment } = require('../db')

async function getAllPayments () {
  return await userPayment.findAll()
}

async function createPayment (data) {
  // VERIFICAR que nombres de parámetros coincidan con los del modelo Payment de la DB
  const { card_number, expiration_day, provider } = data

  return await userPayment.findOrCreate({
    where: {
      card_number,
      expiration_day,
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
