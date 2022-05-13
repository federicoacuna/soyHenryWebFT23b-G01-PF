const { CartItem } = require('../db')

const saveProducts = async () => {
  try {
    await CartItem.create({
      productId: 4,
      userId: 1,
      quantity: 20,
      price: 245.5
    })
    await CartItem.create({
      productId: 8,
      userId: 1,
      quantity: 4,
      price: 4445.5
    })
  } catch (err) {
    console.log(err)
  }
}

saveProducts()
  .catch(err => console.log(err))
