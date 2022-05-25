import { GET_ORDERS, GET_ORDER_DETAILS, SET_ORDER_ITEMS, SET_ORDER_ADDRESS } from '../constants'

const initialState = {
  data: [],
  orderDetails: {},
  order: {}
}

const orders = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: payload
      }

    case GET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: payload
      }

    case SET_ORDER_ITEMS:
      return {
        ...state,
        order: {
          ...state.order,
          orderItems: payload
        }
      }

    case SET_ORDER_ADDRESS:
      return {
        ...state,
        order: {
          ...state.order,
          address: payload
        }
      }

    default:
      return state
  }
}

export default orders
