const { CartItem } = require('../db')

const saveProducts = async () => {
  try {
    await CartItem.create(
      {
        quantity: 20
      })
    await CartItem.create(
      {
        quantity: 0
      })
  } catch (err) {
    console.log(err)
  }
}

saveProducts()
  .catch(err => console.log(err))
