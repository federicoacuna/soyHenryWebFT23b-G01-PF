import { GET_PRODUCTS, GET_PRODUCT_DETAILS, ADD_PRODUCTS_FILTER, CLEAR_PRODUCTS_FILTER, SET_PRODUCTS_SORTING } from '../constants'

const initialState = {
  data: [],
  productDetail: {},
  filter: {},
  pagination: {},
  page: 1
}

const productsReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        data: payload.rows,
        pagination: payload.pagination
      }

    case GET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetail: payload
      }

    case ADD_PRODUCTS_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          page: 1,
          [payload.name]: [payload.value]
        }
      }

    case SET_PRODUCTS_SORTING:
      return {
        ...state,
        filter: {
          ...state.filter,
          sort: payload
        }
      }
    case CLEAR_PRODUCTS_FILTER:
      return {
        ...state,
        filter: {}
      }

    default:
      return state
  }
}

export default productsReducer
