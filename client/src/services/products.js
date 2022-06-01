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

export const putProduct = async (newValues) => {
  const { token } = store.getState().users
  const { currentPage } = store.getState().products.pagination
  const { id: productId, ...newProduct } = newValues
  newProduct.page = currentPage
  const newProductForm = new FormData()

  for (const key in newProduct) {
    if (key === 'image') {
      newProduct.image.forEach(img => newProductForm.append('image', img))
    }
    newProductForm.append(key, newProduct[key])
  }

  const { data } = await axios.put(`${endpoint}/${productId}`, newProductForm, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const postProduct = async (newProduct) => {
  const { token } = store.getState().users
  const newProductForm = new FormData()

  for (const key in newProduct) {
    if (key === 'image') {
      newProduct.image.forEach(img => newProductForm.append('image', img))
    }
    newProductForm.append(key, newProduct[key])
  }

  const { data } = await axios.post(endpoint, newProductForm, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}
