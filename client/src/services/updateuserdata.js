import store from '../redux/store'
import axios from 'axios'

export const updateUser = function (newData) {
  newData.id = Number(newData.id)
  const urlString = `/users/${newData.id}`

  const { token } = store.getState()
  axios.put(urlString, newData, {
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
