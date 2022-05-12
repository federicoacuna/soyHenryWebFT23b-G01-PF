const { Order, OrderItem } = require('../db')

async function getOrderDetails (orderId) {
  try {
    const orderData = await Order.findOne({
      where: {
        id: orderId
      }
    })
    const order = await orderData.toJson()
    const orderItemsData = await _getItems(orderId)
    const orderItems = await orderItemsData.toJson()
    order.items = orderItems
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
    const createdOrder = Order.create(newOrder)
    const newItems = newOrder.items.map(item => {
      item.orderId = createdOrder.id
      return item
    })
    return _createItems(newItems)
  } catch (error) {
    return { error: error.message }
  }
}

async function _getItems (orderId) {
  try {
    OrderItem.findAll({
      where: {
        orderId
      }
    })
  } catch (error) {
    return { error: error.message }
  }
}

async function _createItems (newItems) {
  try {
    OrderItem.bulkCreate(newItems)
    return { message: 'Order created succesfully' }
  } catch (error) {
    return { error: error.message }
  }
}

module.exports = {
  getOrders,
  getOrderDetails,
  createOrder
}
