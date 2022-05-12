
import {
  GET_PRODUCTS,
  GET_CATEGORIES,
  GET_PRODUCT_DETAILS,//eslint-disable-line
  ADD_FILTER_PARAM,
  SET_ORDER_TYPE,//eslint-disable-line
  SET_CART_PRODUCTS,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  REMOVE_CART_ITEM
} from '../constants'

const initialState = {
  products: [],
  cartProducts: [],
  categories: [],
  options: {}
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload
      }

    case ADD_FILTER_PARAM:
      return {
        ...state,
        options: {
          ...state.options,
          [payload.name]: [payload.value]
        }
      }

    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload
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

    default:
      return state
  }
}

export default reducer
