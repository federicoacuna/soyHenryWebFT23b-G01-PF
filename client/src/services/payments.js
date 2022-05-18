import store from '../redux/store'
import axios from 'axios'

export default function Payments (values) {
  const { token } = store.getState()
  axios.post('/payments', values, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
