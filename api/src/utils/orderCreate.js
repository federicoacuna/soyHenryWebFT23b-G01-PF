const { Order } = require('../db')
const saveProducts = async () => {
  try {
    await Order.create({
      status: 'PAYED',
      total: 4.910,
      userId: 1,
      userPaymentId: 1,
      userAddressId: 1,
      branchId: 1
    })
    await Order.create({
      status: 'PREPARED',
      total: 17782,
      userId: 2,
      userPaymentId: 1,
      userAddressId: 2,
      branchId: 1
    })
  } catch (error) {
    console.log(error)
  }
}

saveProducts()
  .catch(error => console.log(error))
