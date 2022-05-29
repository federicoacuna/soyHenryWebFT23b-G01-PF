import { postCategory, getCategories, putCategory, deleteCategory } from '../../services/categories'
import { GET_CATEGORIES, SET_TOAST } from '../constants'

export const createNewCategory = (newCategory) => {
  return async (dispatch) => {
    try {
      const { message, data } = await postCategory(newCategory)
      const toast = {
        title: 'Categoria Agregada!',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_CATEGORIES,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const { message } = error
      const toast = {
        title: 'Error interno!',
        description: message,
        status: 'error',
        duration: 3500,
        isClosable: true
      }
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    }
  }
}

export const getCategoriesList = () => {
  return async (dispatch) => {
    try {
      const { data } = await getCategories()

      dispatch({
        type: GET_CATEGORIES,
        payload: data
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No pudimos recuperar la lista de categorias.',
        status: 'error',
        duration: 4500,
        isClosable: true
      }
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    }
  }
}

export const updateCategory = (categoryId, values) => {
  return async (dispatch) => {
    try {
      const { data, message } = await putCategory(categoryId, values)
      const toast = {
        title: 'Categoria Actualizada.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_CATEGORIES,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos actualizar la categoria.',
        status: 'error',
        duration: 3500,
        isClosable: true
      }
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    }
  }
}

export const removeCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      const { message, data } = await deleteCategory(categoryId)
      const toast = {
        title: 'Categoria Eliminada.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_CATEGORIES,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos eliminar la categoria.',
        status: 'error',
        duration: 3500,
        isClosable: true
      }
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    }
  }
}
