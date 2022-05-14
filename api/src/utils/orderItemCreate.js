const { OrderItem } = require('../db')
const saveProducts = async () => {
  try {
    await OrderItem.create({
      quantity: 4,
      price: 245.5,
      productId: 4,
      orderId: 1
    })
    await OrderItem.create({
      quantity: 4,
      price: 4445.5,
      productId: 8,
      orderId: 2
    })
  } catch (error) {
    console.log(error)
  }
}

saveProducts()
  .catch(error => console.log(error))
