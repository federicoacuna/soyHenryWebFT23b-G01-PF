import axios from 'axios'
import store from '../redux/store'

export const getProductsService = async (options) => {
  let urlString = '/products'

  if (options) {
    urlString += '?'
    for (const param of Object.entries(options)) {
      urlString += `${param[0]}=${param[1]}&`
    }
  }

  const { data } = await axios.get(urlString)
  return data
}

export const getDetailsProductsService = async (productId) => {
  try {
    const { token } = store.getState()
    const urlString = `/products/${productId}`
    if (token) {
      const { data } = await axios.get(urlString, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return data
    } else {
      const { data } = await axios.get(urlString)
      return data
    }
  } catch (error) {
    return error
  }
}
