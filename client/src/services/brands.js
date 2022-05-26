import axios from 'axios'
import store from '../redux/store'

const endpoint = '/brands'

export const postBrand = async (newBrand) => {
  const token = store.getState().users.token
  const { data } = await axios.get(endpoint, newBrand, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const getBrands = async () => {
  const { data } = await axios.get(endpoint)

  return data
}

export const putBrand = async (brandId) => {
  const token = store.getState().users.token
  const { data } = await axios.get(`${endpoint}/${brandId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const deleteBrand = async (brandId) => {
  const token = store.getState().users.token
  const { data } = await axios.delete(`${endpoint}/${brandId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}
