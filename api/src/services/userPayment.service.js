const { userPayment, paymentTypes } = require('../db')

async function getAllPayments (userId) {
  return await userPayment.findAll({
    where: { user_id: userId }
    include: paymentTypes
  })
}

async function createPayment (data) {
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
