require('dotenv').config()
const axios = require('axios')
const { Order, OrderItem, UserAddress, UserPayment, PaymentType, Country, Product } = require('../db')

async function admAllOrders () {
  try {
    const orders = await Order.findAll()
    return orders
  } catch (error) {
    return { error }
  }
}

async function getOrderDetails (orderId, userId) {
  try {
    const orderData = await Order.findOne({
      where: {
        id: orderId,
        userId
      },
      include: [{
        model: UserAddress
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

async function getOrdersByUser (userId) {
  try {
    const result = await Order.findAll({
      where: {
        userId
      },
      include: {
        model: Product
      }
    })
    return result
  } catch (error) {
    return error
  }
}

async function createOrder (newOrder) {
  try {
    const createOrder = await Order.create(newOrder)
    const userPaymentData = await UserPayment.findOne({
      where: {
        id: newOrder.userPaymentId
      },
      include: PaymentType
    })

    const userAddressData = await UserAddress.findOne({
      where: {
        id: newOrder.userAddressId
      },
      include: Country
    })

    if (!createOrder) return false
    const newItems = newOrder.orderItems.map(item => {
      item.orderId = createOrder.id
      return item
    })

    const createdItems = await _createItems(newItems)
    if (!createdItems) return false
    const productList = []
    for (let i = 0; i < newItems.length; i++) {
      const productBought = await Product.findOne({
        where: {
          id: newItems[i].productId
        }
      })
      productList.push(productBought)
    }
    if (!productList) return false
    const orderItems = []
    for (let i = 0; i < productList.length; i++) {
      orderItems.push({ id: productList[i].id, name: productList[i].name, quantity: newItems[i].quantity, price: newItems[i].price })
    }

    if (!createOrder && !userPaymentData && !userAddressData && !createdItems) return false
    const createdOrder = {
      orderId: createOrder.id,
      userPayment: {
        paymentType: userPaymentData.paymentType.paymentName,
        cardNumber: userPaymentData.cardNumber,
        provider: userPaymentData.provider
      },
      userAddress: {
        postalCode: userAddressData.postalCode,
        streetName: userAddressData.streetName,
        houseNumber: userAddressData.houseNumber,
        city: userAddressData.city,
        state: userAddressData.state,
        country: userAddressData.country.countryName
      },
      orderItems,
      total: createOrder.total
    }

    return createdOrder
  } catch (error) {
    return error
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

async function validatePaymentId (paymentId) {
  try {
    const { data } = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
      }
    })

    return data
  } catch (error) {
    console.log(error)
  }
}

async function updateOrder (orderId, value) {
  try {
    const order = await Order.findOne({ where: { id: orderId } })
    console.log('service', orderId, value, order)
    order.update(value)
    return order
  } catch (error) {
    return error
  }
}

module.exports = {
  getOrders,
  getOrderDetails,
  getOrdersByUser,
  createOrder,
  validatePaymentId,
  admAllOrders,
  updateOrder
}
