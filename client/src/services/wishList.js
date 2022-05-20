import store from '../redux/store'
import axios from 'axios'

export function deleteFromWishList (productId) {
  const { token } = store.getState()
  axios.delete(`wishlists/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log(error)
    })
}

export function addToWishList (productId) {
  const { token } = store.getState()
  axios.post('/wishlists', { productId }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log(error)
    })
}
