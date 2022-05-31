const ordersService = require('../services/orders.service')
const usersService = require('../services/users.service')

const get = async (req, res) => {
  try {
    const user = await usersService.getUserByEmail(req.user.email)
    if (user.isAdmin) {
      ordersService.admAllOrders(req.query)
        .then(allOrders => allOrders ? res.status(200).json({ data: allOrders }) : res.status(400).json({ error: 'No orders' }))
    } else {
      ordersService.getOrdersByUser(user.id)
        .then(retrievedOrders => retrievedOrders ? res.status(200).json({ data: retrievedOrders }) : res.status(400).json({ error: 'No orders where found matching the search criteria' }))
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

const getById = async (req, res) => {
  const { orderId } = req.params
  try {
    const user = await usersService.getUserByEmail(req.user.email)
    ordersService.getOrderDetails(orderId, user.id)
      .then(orderDetails => orderDetails ? res.status(200).json({ data: orderDetails }) : res.status(400).json({ error: 'Requested order not found' }))
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
      const all = ordersService.admAllOrders()
      newOrder
        ? res.status(200).json({
          message: `Order successfully created under ID ${newOrder.orderId}`,
          data: all
        })
        : res.status(400).json({
          error: 'Order could not be created',
          data: all
        })
    } catch (error) {
      res.status(400).json(error)
    }
  } else {
    res.status(400).json(Object.values(validationErrors))
  }
}

const update = async (req, res) => {
  const user = await usersService.getUserByEmail(req.user.email)
  const { orderId } = req.params
  try {
    if (user.isAdmin) {
      const update = await ordersService.updateOrder(orderId, req.body)
      const all = await ordersService.admAllOrders()
      console.log(all)
      update[0] > 0
        ? res.status(200).json({
          data: all,
          message: 'Order updated correctly'
        })
        : res.status(400).json({
          error: 'Error trying to update order'
        })
    } else {
      res.json({ message: 'THIS FUNCTION HAS NOT BEEN IMPLEMENTED YET' })
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

const remove = async (req, res) => {
  // update del status a cancelada, update devuelve 0 o 1
  res.json({ message: 'THIS FUNCTION HAS NOT BEEN IMPLEMENTED YET' })
}

const mpValidator = async (req, res) => {
  const paymentId = req.query.payment_id

  const paymentDetails = await ordersService.validatePaymentId(paymentId)

  if (paymentDetails.status === 'approved') {
    const order = paymentDetails.metadata
    console.log(order)
    const newOrder = {
      userId: order.user.id,
      userAddressId: order.address.id,
      userPaymentId: 3,
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
  getById,
  update,
  remove,
  mpValidator
}
