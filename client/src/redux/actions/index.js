import { getProductsService, getDetailsProductsService } from '../../services/products'
import { getCategoriesService } from '../../services/categories'

import { GET_PRODUCTS, GET_CATEGORIES, GET_PRODUCT_DETAILS, ADD_FILTER_PARAM, SET_ORDER_TYPE } from '../constants'

export const getProducts = (options) => {
  return async (dispatch) => {
    try {
      const products = await getProductsService(options)

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

export const getProductDetails = (productId) => {
  return async (dispatch) => {
    try {
      const products = await getDetailsProductsService(productId)

      dispatch({
        type: GET_PRODUCT_DETAILS,
        payload: products
      })
    } catch (error) {
      dispatch({
        type: GET_PRODUCT_DETAILS,
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

export const addFilterParams = (options) => {
  return {
    type: ADD_FILTER_PARAM,
    payload: options
  }
}

export const setOrder = (order) => {
  return {
    type: SET_ORDER_TYPE,
    payload: order
  }
}
