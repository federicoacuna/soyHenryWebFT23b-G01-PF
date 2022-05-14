const { PaymentType } = require('../db')

const saveProducts = async () => {
  try {
    await PaymentType.create({
      paymentName: 'Tarj. Crédito'
    })
    await PaymentType.create({
      paymentName: 'Tarj. Débito'
    })
    await PaymentType.create({
      paymentName: 'Mercado Pago'
    })
  } catch (error) {
    console.log(error)
  }
}
saveProducts()
  .catch(error => console.log(error))
