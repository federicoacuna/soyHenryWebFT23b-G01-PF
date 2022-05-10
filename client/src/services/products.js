import axios from 'axios'

export const getProductsService = async (options) => {
  let urlString = '/product'

  if (options) {
    urlString += '?'
    for (const param of Object.entries(options)) {
      urlString += `${param[0]}=${param[1]}&`
    }
  }

  const { data } = await axios.get(urlString)
  return data
}

export const getCategoriesService = async () => {
  const { data } = await axios.get('/categories')

  return data
}
