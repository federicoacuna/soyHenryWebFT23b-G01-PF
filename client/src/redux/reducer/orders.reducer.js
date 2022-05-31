import { GET_ORDERS, GET_ORDER_DETAILS, SET_ORDER_ITEMS, SET_ORDER_ADDRESS, ADD_ORDERS_FILTER, CLEAR_ORDERS_FILTER } from '../constants'

const initialState = {
  data: [],
  orderDetails: {},
  order: {},
  filter: {}
}

const orders = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_ORDERS:
      return {
        ...state,
        data: payload
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

    case ADD_ORDERS_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          page: 1,
          [payload.name]: [payload.value]
        }
      }
    case CLEAR_ORDERS_FILTER:
      return {
        ...state,
        filter: {}
      }

    default:
      return state
  }
}

export default orders
