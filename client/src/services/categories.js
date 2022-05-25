import axios from 'axios'
import store from '../redux/store'

const endpoint = '/categories'

export const postCategory = async (newCategory) => {
  const token = store.getState().users.token
  const { data } = await axios.post(endpoint, newCategory, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const getCategories = async () => {
  const { data } = await axios.get(endpoint)

  return data
}

export const putCategory = async (categoryId) => {
  const token = store.getState().users.token
  const { data } = await axios.get(`${endpoint}/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const deleteCategory = async (categoryId) => {
  const token = store.getState().users.token
  const { data } = await axios.delete(`${endpoint}/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}
