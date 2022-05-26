import axios from 'axios'
import store from '../redux/store'

const endpoint = '/products'

export const getProducts = async (options) => {
  let urlString = endpoint
  urlString += '?'
  for (const param of Object.entries(options)) {
    urlString += `${param[0]}=${param[1]}&`
  }

  const { data } = await axios.get(urlString)
  return data
}

export const getProduct = async (productId) => {
  const { token } = store.getState().users
  const urlString = `/products/${productId}`
  const { data } = await axios.get(urlString, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const deleteProduct = async (productId) => {
  const { token } = store.getState().users
  const { data } = await axios.put(`${endpoint}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const putProduct = async (productId) => {
  const { token } = store.getState().users
  const { data } = await axios.delete(`${endpoint}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const postProduct = async (newProduct) => {
  const { token } = store.getState().users
  const { data } = await axios.delete(endpoint, newProduct, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}
