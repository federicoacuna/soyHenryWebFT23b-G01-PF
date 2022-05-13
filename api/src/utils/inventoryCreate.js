const { Inventory } = require('../db')

const saveProducts = async () => {
  try {
    await Inventory.create(
      {
        branchId: 1,
        productId: 3,
        stock: 20
      })
    await Inventory.create(
      {
        branchId: 1,
        productId: 7,
        stock: 11
      })
  } catch (err) {
    console.log(err)
  }
}

saveProducts()
  .catch(err => console.log(err))
