import store from '../redux/store'
import axios from 'axios'

const { token } = store.getState().users
const endpoint = '/reviews'

export const putReview = async function (reviewId) {
  const { data } = await axios.put(`${endpoint}/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const deleteReview = async function (reviewId) {
  const { data } = await axios.put(`${endpoint}/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const postReview = async function (newReview) {
  newReview.productId = parseInt(newReview.productId)
  const { data } = await axios.post(endpoint, newReview, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const getReviews = async function () {
  const { data } = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}
