import { GET_PRODUCTS } from '../constants'

const initialState = {
  products: []
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case GET_PRODUCTS:
      return { ...state, products: payload }
    default:
      return state
  }
}

export default reducer
