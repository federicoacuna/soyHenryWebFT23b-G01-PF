import { getProductsService, getCategoriesService } from '../../services/products'

import { GET_PRODUCTS, GET_CATEGORIES } from '../constants'

export const getProducts = (options) => {
  let URL = '/product'

  if (options) {
    URL += '?'
    for (const param of Object.entries(options)) {
      URL += `${param[0]}=${param[1]}&`
    }
  }

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
