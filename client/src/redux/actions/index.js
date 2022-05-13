import { getProductsService, getDetailsProductsService } from '../../services/products'
import { getCategoriesService } from '../../services/categories'

import {
  GET_PRODUCTS,
  GET_CATEGORIES,
  GET_PRODUCT_DETAILS,
  ADD_FILTER_PARAM,
  CLEAR_FILTER_PARAMS,
  SET_ORDER_TYPE,
  SET_CART_PRODUCTS,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  REMOVE_CART_ITEM
} from '../constants'

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

export const clearFilterParams = () => {
  return {
    type: CLEAR_FILTER_PARAMS
  }
}

export const setOrder = (order) => {
  return {
    type: SET_ORDER_TYPE,
    payload: order
  }
}

// CART
export const setCartProducts = (products) => {
  return {
    type: SET_CART_PRODUCTS,
    payload: products
  }
}

export const addProductToCart = (product) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: product
  }
}

export const removeProductFromCart = (product) => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: product
  }
}

export const removeCartItem = (product) => {
  return {
    type: REMOVE_CART_ITEM,
    payload: product
  }
}
