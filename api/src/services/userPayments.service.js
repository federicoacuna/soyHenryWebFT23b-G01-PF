const { UserPayment, PaymentType } = require('../db')

async function getUserPayments (userId) {
  return await UserPayment.findAll({
    where: { userId },
    include: PaymentType
  })
}

async function createUserPayment (newUserPayment) {
  const { cardNumber } = newUserPayment

  const [, wasCreated] = await UserPayment.findOrCreate({
    where: {
      cardNumber
    },
    defaults: newUserPayment
  })

  return wasCreated
}

async function removeUserPayment (paymentId) {
  const deletedPayment = await UserPayment.update({
    deleted: true,
    where: { id: paymentId }
  })

  return !!deletedPayment
}

module.exports = {
  getUserPayments,
  createUserPayment,
  removeUserPayment
}
