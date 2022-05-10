import axios from 'axios'

export const getProductsService = async () => {
  const { data } = await axios.get('/products')

  return data
}

export const getCategoriesService = async () => {
  const { data } = await axios.get('/categories')

  return data
}
