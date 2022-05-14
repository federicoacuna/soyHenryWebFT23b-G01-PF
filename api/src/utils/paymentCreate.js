const { UserPayment } = require('../db')
const saveProducts = async () => {
  try {
    await UserPayment.create({
      cardNumber: 5427074312728875,
      expirationDay: '2023-01',
      provider: 'Mastercard',
      userId: 1,
      paymentTypeId: 1
    })
    await UserPayment.create({
      cardNumber: 5427074312728876,
      expirationDay: '2023-01',
      provider: 'Mastercard',
      userId: 2,
      paymentTypeId: 1
    })
  } catch (error) {
    console.log(error)
  }
}

saveProducts()
  .catch(error => console.log(error))
