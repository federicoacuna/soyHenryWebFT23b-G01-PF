import { GET_PRODUCTS, GET_CATEGORIES } from '../constants'


const initialState = {
  products: [],
  categories: []
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case GET_PRODUCTS:
      return { ...state, products: payload }

    case GET_CATEGORIES:
      return { ...state, categories: payload }

    default:
      return state
  }
}

export default reducer
