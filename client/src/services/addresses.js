import store from '../redux/store'
import axios from 'axios'

export const createAddress = function (values) {
  values.countryId = Number(values.countryId)

  const { token } = store.getState()
  axios.post('/addresses', values, {
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
