
import { GET_PRODUCTS, GET_CATEGORIES, ADD_FILTER_PARAM } from '../constants'


const initialState = {
  products: [],
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

    default:
      return state
  }
}

export default reducer
