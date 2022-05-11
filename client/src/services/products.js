import axios from 'axios'

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
  const urlString = `/product/${productId}`

  const { data } = await axios.get(urlString)
  return data
}
