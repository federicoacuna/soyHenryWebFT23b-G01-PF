import axios from 'axios'

export const getProductsService = async (option) => {

  const { data } = await axios.get(`/products?name=${option}`)
  return data
}

export const getCategoriesService = async () => {
  const { data } = await axios.get('/categories')

  return data
}

