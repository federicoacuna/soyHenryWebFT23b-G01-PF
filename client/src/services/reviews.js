import store from '../redux/store'
import axios from 'axios'

const { token } = store.getState()
const endpoint = '/reviews'

export const updateReview = async function (newData) {
  const { data } = await axios.put(endpoint, newData, {
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
