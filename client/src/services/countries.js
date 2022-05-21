import store from '../redux/store'
import axios from 'axios'

const { token } = store.getState()
const endpoint = '/countries'

export const getAllCountries = async () => {
  const allCountries = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return allCountries
}
