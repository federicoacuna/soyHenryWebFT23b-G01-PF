import axios from 'axios'

export const createOrder = async (newOrder) => {
  newOrder.orderItems = newOrder.orderItems.map(item => {
    item.productId = item.id
    return item
  })
  newOrder.total = newOrder.orderItems.reduce((acc, item) => {
    return acc + (item.quantity * item.price)
  }, 0)

  const { data } = await axios.post('/orders', newOrder)
  return data
}

export const getOrders = async (token) => {
  const { data } = await axios.get('/orders', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}
