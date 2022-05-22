import store from '../redux/store'
import axios from 'axios'

const endpoint = '/wishlists'

export const removeFromWishList = async function (productId) {
  const { token } = store.getState()
  const { data } = await axios.delete(`${endpoint}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const insertInWishList = async function (productId) {
  const { token } = store.getState()
  const { data } = await axios.post(endpoint, { productId }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const getUserWishList = async function () {
  const { token } = store.getState()
  const { data } = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}
