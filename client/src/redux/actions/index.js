import { getProductsService } from '../../services/products.service'
import { getCategoriesService } from '../../services/categories.service'
import { GET_PRODUCTS, GET_CATEGORIES } from '../constants'

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const products = await getProductsService()

      dispatch({
        type: GET_PRODUCTS,
        payload: products
      })
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS,
        payload: error.message
      })
    }
  }
}

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const categories = await getCategoriesService()

      dispatch({
        type: GET_CATEGORIES,
        payload: categories
      })
    } catch (error) {
      dispatch({
        type: GET_CATEGORIES,
        payload: error.message
      })
    }
  }
}
