import store from '../redux/store'
import axios from 'axios'

const endpoint = '/categories'

export const getCategoriesService = async () => {
  const { data } = await axios.get(endpoint)

  return data
}

export const postCategoryService = async (newCategory) => {
  const { token } = store.getState()
  const { data } = await axios.post(endpoint, newCategory, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const deleteCategoryService = async (newData) => {
  const { token } = store.getState()
  const link = `${endpoint}/${newData.categoryId}`
  const { data } = await axios.delete(link, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}
