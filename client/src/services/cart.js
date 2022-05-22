import store from '../redux/store'
import axios from 'axios'

const { token } = store.getState()
const endpoint = '/cart'

export const postCartItem = async (productId) => {
  const { data } = await axios.post(`${endpoint}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const deleteCartItem = async (productId) => {
  const { data } = await axios.delete(`${endpoint}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const deleteCart = async () => {
  const { data } = await axios.delete(`${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const getCart = async () => {
  const { data } = await axios.get(`${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}
