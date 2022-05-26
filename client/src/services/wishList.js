import store from '../redux/store'
import axios from 'axios'

const endpoint = '/wishlists'

export const deleteWishlistItem = async function (productId) {
  const { token } = store.getState().users
  const { data } = await axios.delete(`${endpoint}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const postWishlistItem = async function (productId) {
  const { token } = store.getState().users
  const { data } = await axios.post(endpoint, { productId }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const getWishList = async function () {
  const { token } = store.getState().users
  const { data } = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}
