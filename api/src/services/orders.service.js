const { Order, OrderItem, UserAddress, UserPayment } = require('../db')

async function getOrderDetails (orderId) {
  try {
    const orderData = await Order.findOne({
      where: {
        id: orderId
      },
      include: [{
        model: UserAddress
      },
      {
        model: UserPayment
      }]
    })
    const order = await orderData.toJSON()
    const orderItems = await _getItems(orderId)
    order.orderItems = orderItems
    return order
  } catch (error) {
    return { error: error.message }
  }
}

async function getOrders (searchOptions) {
  try {
    const searchParams = {}
    for (const param in Object.entries(searchOptions)) {
      searchParams[param[0]] = param[1]
    }
    return Order.findAll(searchParams)
  } catch (error) {
    return { error: error.message }
  }
}

async function createOrder (newOrder) {
  try {
    const createdOrder = await Order.create(newOrder)
    if (createOrder) {
      const newItems = newOrder.orderItems.map(item => {
        item.orderId = createdOrder.id
        return item
      })
      console.log(newItems)
      const createdItems = await _createItems(newItems)
      return createdItems ? createdOrder.id : false
    }
    return false
  } catch (error) {
    return { error: error.message }
  }
}

async function _getItems (orderId) {
  try {
    const retrievedOrderItems = await OrderItem.findAll({
      where: {
        orderId
      }
    })
    return retrievedOrderItems.map(orderItem => orderItem.toJSON())
  } catch (error) {
    return error
  }
}

async function _createItems (newItems) {
  try {
    const createdItems = await OrderItem.bulkCreate(newItems)
    return !!createdItems
  } catch (error) {
    return error
  }
}

module.exports = {
  getOrders,
  getOrderDetails,
  createOrder
}
