const ordersService = require('../services/orders.service')
const usersService = require('../services/users.service')

const get = async (req, res) => {
  const { orderId } = req.params

  try {
    if (!orderId) {
      const user = await usersService.getUserByEmail(req.user.email)
      ordersService.getOrdersByUser(user.id)
        .then(retrievedOrders => retrievedOrders ? res.json(retrievedOrders) : res.status(404).json({ error: 'No orders where found matching the search criteria' }))
    } else {
      const user = await usersService.getUserByEmail(req.user.email)
      ordersService.getOrderDetails(orderId, user.id)
        .then(orderDetails => orderDetails ? res.json(orderDetails) : res.status(404).json({ error: 'Requested order not found' }))
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

const create = async (req, res) => {
  const { userPaymentId, userAddressId, branchId, total, orderItems } = req.body
  const validationErrors = {}
  const currentUser = await usersService.getUserByEmail(req.user.email)
  req.body.userId = currentUser.id

  if (!userPaymentId) {
    validationErrors.userPaymentId = 'Must provide user(buyer) payment method ID'
  } else {
    (isNaN(parseInt(userPaymentId)) || userPaymentId === 'MP') && (validationErrors.userPaymentId = 'User(buyer) payment method ID must be an integer')
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

const mpValidator = async (req, res) => {
  const paymentId = req.query.payment_id

  const paymentDetails = await ordersService.validatePaymentId(paymentId)

  if (paymentDetails.status === 'approved') {
    const { order } = paymentDetails.metadata

    const newOrder = {
      userId: order.user_id,
      userAddressId: order.user_address_id,
      userPaymentId: order.user_payment_id,
      total: order.total,
      orderItems: order.order_items.map(item => {
        return {
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }
      }),
      status: 'CREATED'
    }

    try {
      const createdOrder = await ordersService.createOrder(newOrder)
      const succesURL = `${process.env.FRONTEND_URL || 'http://localhost:3000/'}confirmation/${createdOrder.orderId}`
      createdOrder && res.redirect(succesURL)
    } catch (error) {
      console.log(error)
    }
  } else {
    const failureURL = `${process.env.FRONTEND_URL || 'http://localhost:3000/'}`
    res.redirect(failureURL)
  }
}

module.exports = {
  create,
  get,
  update,
  remove,
  mpValidator
}
