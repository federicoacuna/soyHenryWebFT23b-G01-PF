import { GET_CATEGORIES } from '../constants'

const initialState = {
  data: []
}

const categories = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        data: payload
      }

    default:
      return state
  }
}

export default categories
