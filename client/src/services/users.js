import axios from 'axios'
import store from '../redux/store'

const { token } = store.getState()
const endpoint = '/users'

export const sendToken = async (token) => {
  const { data } = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const updateUser = function (newData) {
  axios.put(endpoint, newData, {
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
