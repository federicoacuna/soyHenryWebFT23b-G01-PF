import axios from 'axios'
import store from '../redux/store'

export const postOrder = async (newOrder) => {
  const { token } = store.getState().users
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
  const { token } = store.getState().users
  const { data } = await axios.get('/orders', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const getOrder = async (orderId) => {
  const { token } = store.getState().users
  const { data } = await axios.get(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const putOrder = async (orderId) => {
  const { token } = store.getState().users
  const { data } = await axios.put(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const deleteOrder = async (orderId) => {
  const { token } = store.getState().users
  const { data } = await axios.delete(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}
