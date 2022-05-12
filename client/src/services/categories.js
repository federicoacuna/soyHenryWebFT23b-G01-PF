import axios from 'axios'

export const getCategoriesService = async () => {
  const { data } = await axios.get('/categories')

  return data
}
