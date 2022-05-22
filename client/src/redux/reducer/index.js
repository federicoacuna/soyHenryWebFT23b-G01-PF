
import {
  SET_TOAST,
  GET_PRODUCTS,
  GET_BRANDS,
  GET_CATEGORIES,
  GET_COUNTRIES,
  GET_PRODUCT_DETAILS,
  ADD_FILTER_PARAM,
  CLEAR_FILTER_PARAMS,
  SET_CART_PRODUCTS,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  REMOVE_CART_ITEM,
  LOG_IN,
  LOG_OUT,
  SET_SORTING,
  SET_USER_PAYMENT,
  SET_USER_ADDRESS,
  SET_ORDER_ITEMS,
  CREATE_ORDER,
  CLEAR_CREATED_ORDER,
  GET_ORDERS,
  UPDATE_WISHLIST,
  GET_WISHLIST,
  GET_ADDRESSES,
  UPDATE_ADDRESSES,
  UPDATE_PAYMENTS,
  UPDATE_CART,
  GET_REVIEWS,
  GET_PAYMENTS,
  GET_ORDER_DETAILS
} from '../constants'

const initialState = {
  products: [],
  cartProducts: [],
  brands: [],
  categories: [],
  countries: [],
  options: {},
  product: {},
  user: {},
  addresses: [],
  payments: [],
  wishlist: [],
  order: {},
  createdOrder: {},
  orders: [],
  reviews: [],
  toast: {},
  orderDetails: {},
  token: window.localStorage.getItem('token')
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case SET_TOAST:
      return {
        ...state,
        toast: payload
      }

    case GET_PRODUCTS:
      return {
        ...state,
        products: payload
      }

    case GET_PRODUCT_DETAILS:
      return {
        ...state,
        product: payload

      }

    case ADD_FILTER_PARAM:
      return {
        ...state,
        options: {
          ...state.options,
          [payload.name]: [payload.value]
        }
      }

    case CLEAR_FILTER_PARAMS:
      return {
        ...state,
        options: {}
      }

    case SET_SORTING:
      return {
        ...state,
        options: {
          ...state.options,
          sort: payload
        }
      }

    case GET_BRANDS:
      return {
        ...state,
        brands: payload
      }

    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload
      }
    case GET_ORDERS:
      return {
        ...state,
        orders: payload
      }
    case GET_COUNTRIES:
      return {
        ...state,
        countries: payload.data
      }

    case SET_CART_PRODUCTS:
      return { ...state, cartProducts: payload }

    case ADD_PRODUCT_TO_CART:
      if (state.cartProducts.find(product => product.id === payload.id) !== undefined) {
        return {
          ...state,
          cartProducts: state.cartProducts
            .map(p => p.id === payload.id ? { ...p, quantity: p.quantity + 1 } : p)
        }
      }
      return { ...state, cartProducts: [...state.cartProducts, { ...payload, quantity: 1 }] }

    case REMOVE_PRODUCT_FROM_CART:
      if (state.cartProducts.find(product => product.id === payload.id).quantity === 1) {
        return {
          ...state,
          cartProducts: state.cartProducts
            .filter(p => p.id !== payload.id)
        }
      }
      return {
        ...state,
        cartProducts: state.cartProducts
          .map(p => p.id === payload.id ? { ...p, quantity: p.quantity - 1 } : p)
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartProducts: state.cartProducts.filter(p => p.id !== payload.id)
      }

    case SET_USER_PAYMENT:
      return {
        ...state,
        order: {
          ...state.order,
          userPaymentId: payload[0],
          paymentType: payload[1]
        }
      }

    case SET_USER_ADDRESS:
      return {
        ...state,
        order: {
          ...state.order,
          userAddressId: payload
        }
      }

    case SET_ORDER_ITEMS:
      return {
        ...state,
        order: {
          ...state.order,
          orderItems: state.cartProducts
        }
      }
    case CREATE_ORDER:
      return {
        ...state,
        createdOrder: payload
      }

    case CLEAR_CREATED_ORDER:
      return {
        ...state,
        createdOrder: {}
      }
    case LOG_IN:
      return {
        ...state,
        user: payload.user,
        token: payload.token
      }

    case LOG_OUT:
      return {
        ...state,
        user: {},
        token: '',
        wishlist: []
      }

    case UPDATE_WISHLIST:
      return {
        ...state,
        wishlist: payload.payload
      }

    case GET_WISHLIST:
      return {
        ...state,
        wishlist: payload
      }

    case GET_ADDRESSES:
      return {
        ...state,
        addresses: payload
      }

    case UPDATE_ADDRESSES:
      return {
        ...state,
        addresses: payload.payload,
        toast: payload.toast
      }

    case GET_PAYMENTS:
      return {
        ...state,
        payments: payload
      }

    case UPDATE_PAYMENTS:
      return {
        ...state,
        user: {
          ...state.user,
          userPayments: payload.payload
        }
      }

    case UPDATE_CART:
      return {
        ...state,
        user: {
          ...state.user,
          cart: payload.payload
        }
      }

    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload
      }

    case GET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: payload
      }
    default:
      return state
  }
}

export default reducer
