const { Inventory } = require('../db')

const saveProducts = async () => {
  try {
    await Inventory.create(
      {
        stock: 20
      })
    await Inventory.create(
      {
        stock: 0
      })
  } catch (err) {
    console.log(err)
  }
}

saveProducts()
  .catch(err => console.log(err))
