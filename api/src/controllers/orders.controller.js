const ordersService = require('../services/orders.service')

const get = (req, res) => {
  const { orderId } = req.params

  try {
    if (!orderId) {
      ordersService.getOrders(req.query)
        .then(retrievedOrders => retrievedOrders ? res.json(retrievedOrders) : res.status(404).json({ error: 'No orders where found matching the search criteria' }))
    }
    ordersService.getOrderDetails(orderId)
      .then(orderDetails => orderDetails ? res.json(orderDetails) : res.status(404).json({ error: 'Requested order not found' }))
  } catch (error) {
    res.status(400).json(error)
  }
}

const create = async (req, res) => {
  const { userId, userPaymentId, userAddressId, branchId, total, orderItems } = req.body
  const validationErrors = {}

  if (!userId) {
    validationErrors.userId = 'Must provide user ID (buyer)'
  } else {
    isNaN(parseInt(userId)) && (validationErrors.userId = 'User ID(buyer) must be an integer')
  }
  if (!userPaymentId) {
    validationErrors.userPaymentId = 'Must provide user(buyer) payment method ID'
  } else {
    isNaN(parseInt(userPaymentId)) && (validationErrors.userPaymentId = 'User(buyer) payment method ID must be an integer')
  }
  if (!userAddressId && !branchId) {
    validationErrors.userAddressId = 'Must provide user(buyer) delivery address ID or branch ID(pickup site)'
  } else {
    isNaN(parseInt(userAddressId)) && (validationErrors.userAddressId = 'User address ID or branch ID must be an integer')
  }
  if (!total) {
    validationErrors.total = 'Must provide order total purchase price'
  } else {
    isNaN(parseInt(total)) && (validationErrors.total = 'Order total purchase price must be an integer')
  }
  if (!orderItems) {
    validationErrors.orderItems = 'Must provide the order items list'
  } else {
    orderItems.length || (validationErrors.total = 'Items list should have at least 1 item')
  }

  if (!Object.keys(validationErrors).length) {
    try {
      const newOrder = await ordersService.createOrder(req.body)
      newOrder ? res.json({ message: `Order successfully created under ID ${newOrder.orderId}`, data: newOrder }) : res.status(400).json({ error: 'Order could not be created' })
    } catch (error) {
      res.status(400).json(error)
    }
  } else {
    res.status(400).json(Object.values(validationErrors))
  }
}

const update = async (req, res) => {
  res.json({ message: 'THIS FUNCTION HAS NOT BEEN IMPLEMENTED YET' })
}

const remove = async (req, res) => {
  res.json({ message: 'THIS FUNCTION HAS NOT BEEN IMPLEMENTED YET' })
}

module.exports = {
  create,
  get,
  update,
  remove
}
