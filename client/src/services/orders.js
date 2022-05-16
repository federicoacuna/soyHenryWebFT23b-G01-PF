import axios from 'axios'

export const createOrder = async (newOrder) => {
  newOrder.orderItems = newOrder.orderItems.map(item => {
    item.productId = item.id
    return item
  })
  newOrder.total = newOrder.orderItems.reduce((acc, item) => {
    return item.quantity * item.price
  }, 0)
  newOrder.status = 'CREATED'
  const { data } = await axios.post('/orders', newOrder)
  return data
}
