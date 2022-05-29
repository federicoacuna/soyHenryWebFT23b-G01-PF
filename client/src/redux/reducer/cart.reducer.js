import { ADD_CART_ITEM, UPDATE_CART, CLEAR_CART, UPDATE_REMOTE_CART } from '../constants'

const initialState = {
  items: [],
  localItems: JSON.parse(window.localStorage.getItem('cart')) || []
}

const cart = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case UPDATE_CART:
      return {
        ...state,
        localItems: payload
      }

    case ADD_CART_ITEM:
      return {
        ...state,
        localItems: state.localItems.findIndex(item => item.id === payload.id) !== -1 ? [...state.localItems] : [...state.localItems, payload]
      }

    case CLEAR_CART:
      return {
        ...state,
        localItems: []
      }

    case UPDATE_REMOTE_CART:
      return {
        ...state,
        items: payload
      }

    default:
      return state
  }
}

export default cart
