import { GET_USER_REVIEWS } from '../constants'

const initialState = {
  data: []
}

const reviews = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case GET_USER_REVIEWS:
      return {
        ...state,
        data: payload
      }

    default:
      return state
  }
}

export default reviews
