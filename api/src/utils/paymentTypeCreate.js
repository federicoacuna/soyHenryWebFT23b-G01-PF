const { PaymentType } = require('../db')

const saveProducts = async () => {
  try {
    await PaymentType.create({
      paymentName: 'Tar Crédito'
    })
    await PaymentType.create({
      paymentName: 'Tar Débito'
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
