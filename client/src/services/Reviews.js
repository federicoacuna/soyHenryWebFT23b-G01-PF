import store from '../redux/store'
import axios from 'axios'

export const createPayment = function (values) {
  const { token } = store.getState()
  axios.post('/reviews', values, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
