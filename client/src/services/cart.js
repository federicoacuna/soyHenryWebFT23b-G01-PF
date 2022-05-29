import store from '../redux/store'
import axios from 'axios'

const endpoint = '/carts'

export const postCart = async (cartList) => {
  const { token } = store.getState().users
  const { data } = await axios.post(endpoint, cartList, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const postCartItem = async (productId) => {
  const { token } = store.getState().users
  const { data } = await axios.post(`${endpoint}/${productId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const putCartItem = async (cartItem) => {
  const { token } = store.getState().users
  const { data } = await axios.put(endpoint, cartItem, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const putMergeCarts = async (localCart) => {
  const { token } = store.getState().users
  const { data } = await axios.put(endpoint, localCart, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const deleteCartItem = async (productId) => {
  const { token } = store.getState().users
  const { data } = await axios.delete(`${endpoint}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const deleteCart = async () => {
  const { token } = store.getState().users
  const { data } = await axios.delete(`${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const getCart = async () => {
  const { token } = store.getState().users
  const { data } = await axios.get(`${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}
