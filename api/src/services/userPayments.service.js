const { UserPayment, PaymentType } = require('../db')

async function getUserPayments (userId) {
  try {
    const userPayments = await UserPayment.findAll({
      where: { userId },
      include: PaymentType
    })

    return userPayments
  } catch (error) {
    console.log(error)
  }
}

async function createUserPayment (newUserPayment) {
  const { cardNumber } = newUserPayment

  try {
    const [, wasCreated] = await UserPayment.findOrCreate({
      where: {
        cardNumber
      },
      defaults: newUserPayment
    })

    return wasCreated
  } catch (error) {
    console.log(error)
  }
}

async function removeUserPayment (paymentId) {
  try {
    const deletedPayment = await UserPayment.update({
      deleted: true,
      where: { id: paymentId }
    })

    return !!deletedPayment
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getUserPayments,
  createUserPayment,
  removeUserPayment
}
