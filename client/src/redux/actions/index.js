import { getProductsService, getDetailsProductsService } from '../../services/products'
import { getBrandsService } from '../../services/brands'
import { getCategoriesService } from '../../services/categories'
import { sendToken } from '../../services/users'
import { createOrder } from '../../services/orders'

import {
  GET_PRODUCTS,
  GET_BRANDS,
  GET_CATEGORIES,
  GET_PRODUCT_DETAILS,
  ADD_FILTER_PARAM,
  CLEAR_FILTER_PARAMS,
  SET_ORDER_TYPE,
  SET_CART_PRODUCTS,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  REMOVE_CART_ITEM,
  LOG_IN,
  LOG_OUT,
  SET_USER_ADDRESS,
  SET_USER_PAYMENT,
  CREATE_ORDER
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
      const product = await getDetailsProductsService(productId)

      dispatch({
        type: GET_PRODUCT_DETAILS,
        payload: product
      })
    } catch (error) {
      dispatch({
        type: GET_PRODUCT_DETAILS,
        payload: error.message
      })
    }
  }
}

export const getBrands = () => {
  return async (dispatch) => {
    try {
      const brands = await getBrandsService()

      dispatch({
        type: GET_BRANDS,
        payload: brands
      })
    } catch (error) {
      dispatch({
        type: GET_BRANDS,
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

// ORDER BUILD
export const setUserPayment = (paymentId) => {
  return {
    type: SET_USER_PAYMENT,
    payload: paymentId
  }
}

export const setUserAddress = (addressId) => {
  return {
    type: SET_USER_ADDRESS,
    payload: addressId
  }
}

export const placeOrder = (newOrder) => {
  return async (dispatch) => {
    try {
      const order = await createOrder(newOrder)
      dispatch({
        type: CREATE_ORDER,
        payload: order
      })
    } catch (error) {
      dispatch({
        type: CREATE_ORDER,
        payload: error.message
      })
    }
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

// AUTH

export const logIn = (token) => {
  return async (dispatch) => {
    try {
      const response = await sendToken(token)

      dispatch({
        type: LOG_IN,
        payload: response
      })
    } catch (error) {
      dispatch({
        type: LOG_IN,
        payload: error.message
      })
    }
  }
}

export const logOut = () => {
  return {
    type: LOG_OUT
  }
}
