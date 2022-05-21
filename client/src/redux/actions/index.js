import store from '../store'
import { getProductsService, getDetailsProductsService } from '../../services/products'
import { getBrandsService } from '../../services/brands'
import { getCategoriesService } from '../../services/categories'
import { sendToken, updateUser } from '../../services/users'
import { createOrder, getOrders } from '../../services/orders'
import { createPayment } from '../../services/payments'
import { removeFromWishList, insertInWishList, getUserWishList } from '../../services/wishList'
import { getReviews } from '../../services/reviews'
import {
  SET_TOAST,
  GET_PRODUCTS,
  GET_BRANDS,
  GET_CATEGORIES,
  GET_PRODUCT_DETAILS,
  ADD_FILTER_PARAM,
  CLEAR_FILTER_PARAMS,
  SET_SORTING,
  SET_CART_PRODUCTS,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  REMOVE_CART_ITEM,
  LOG_IN,
  LOG_OUT,
  SET_USER_ADDRESS,
  SET_USER_PAYMENT,
  SET_ORDER_ITEMS,
  CREATE_ORDER,
  CLEAR_CREATED_ORDER,
  GET_ORDERS,
  UPDATE_WISHLIST,
  GET_WISHLIST,
  GET_REVIEWS
} from '../constants'

export const setToast = (toast) => {
  return {
    type: SET_TOAST,
    payload: toast
  }
}

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

export const getOrdersByUser = (token) => {
  return async (dispatch) => {
    try {
      const result = await getOrders(token)

      dispatch({
        type: GET_ORDERS,
        payload: result
      })
    } catch (error) {
      dispatch({
        type: GET_ORDERS,
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

export const setSorting = (sort) => {
  return {
    type: SET_SORTING,
    payload: sort
  }
}

export const createNewPayment = (newPayment) => {
  return async (dispatch) => {
    try {
      const { token } = store.getState()
      await createPayment(newPayment)
      const user = await sendToken(token)

      dispatch({
        type: LOG_IN,
        payload: { user, token }
      })
    } catch (error) {
      dispatch({
        type: LOG_IN,
        payload: error.message
      })
    }
  }
}

export const updateUserData = (newData) => {
  return async (dispatch) => {
    try {
      const { token } = store.getState()
      await updateUser(newData)
      const user = await sendToken(token)

      dispatch({
        type: LOG_IN,
        payload: { user, token }
      })
    } catch (error) {
      dispatch({
        type: LOG_IN,
        payload: error.message
      })
    }
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

export const setOrderItems = () => {
  return {
    type: SET_ORDER_ITEMS
  }
}

export const placeOrder = () => {
  const state = store.getState()
  const newOrder = state.order
  newOrder.userId = state.user.id
  return async (dispatch) => {
    try {
      const order = await createOrder(newOrder)
      console.log(order)
      dispatch({
        type: CREATE_ORDER,
        payload: order.data
      })
    } catch (error) {
      dispatch({
        type: CREATE_ORDER,
        payload: error.message
      })
    }
  }
}

export const clearCreatedOrder = () => {
  return {
    type: CLEAR_CREATED_ORDER
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
      const user = await sendToken(token)

      dispatch({
        type: LOG_IN,
        payload: { user, token }
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

// USER ACTIVITIES

export const addToWishList = (productId) => {
  return async (dispatch) => {
    try {
      const wishList = await insertInWishList(productId)
      dispatch({
        type: UPDATE_WISHLIST,
        payload: wishList
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteFromWishList = (productId) => {
  return async (dispatch) => {
    try {
      const wishList = await removeFromWishList(productId)
      dispatch({
        type: UPDATE_WISHLIST,
        payload: wishList
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getWishList = () => {
  return async (dispatch) => {
    try {
      const wishList = await getUserWishList()
      dispatch({
        type: GET_WISHLIST,
        payload: wishList
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getUserReviews = (token) => {
  return async (dispatch) => {
    try {
      const reviews = await getReviews(token)

      dispatch({
        type: GET_REVIEWS,
        payload: reviews
      })
    } catch (error) {
      dispatch({
        type: GET_REVIEWS,
        payload: error
      })
    }
  }
}
