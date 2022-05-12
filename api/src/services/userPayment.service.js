const { userPayment, paymentType } = require('../db')

async function getAllPayments (userId) {
  return await userPayment.findAll({
    where: { user_id: userId },
    include: paymentType
  })
}

async function createPayment (data) {
  const { cardNumber, expirationDay, provider } = data

  return await userPayment.findOrCreate({
    where: {
      cardNumber,
      expirationDay,
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
