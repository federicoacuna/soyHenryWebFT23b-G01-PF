const { UserPayment, PaymentType } = require('../db')

async function getAllPayments (userId) {
  return await UserPayment.findAll({
    where: { userId },
    include: PaymentType
  })
}

async function createPayment (data) {
  const { cardNumber, expirationDay, provider } = data

  return await UserPayment.findOrCreate({
    where: {
      cardNumber,
      expirationDay,
      provider
    }
  })
}

async function removePayment (paymentId) {
  return await UserPayment.destroy({
    where: { id: paymentId }
  })
}

module.exports = {
  getAllPayments,
  createPayment,
  removePayment
}
