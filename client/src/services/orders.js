import axios from 'axios'
import store from '../redux/store'

export const createOrder = async (newOrder) => {
  const { token } = store.getState()
  newOrder.orderItems = newOrder.orderItems.map(item => {
    item.productId = item.id
    return item
  })
  newOrder.total = newOrder.orderItems.reduce((acc, item) => {
    return acc + (item.quantity * item.price)
  }, 0)

  const { data } = await axios.post('/orders', newOrder, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const getOrders = async () => {
  const { token } = store.getState()
  const { data } = await axios.get('/orders', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const getOrdersId = async () => {
  const { token } = store.getState()
  const { data } = await axios.get('/orders', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const getDetails = async (orderId) => {
  const { token } = store.getState()
  const { data } = await axios.get(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const orderUpdate = async (orderId, status) => {
  const { token } = store.getState()
  const { data } = await axios.put(`/orders/${orderId}`, { status }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}
