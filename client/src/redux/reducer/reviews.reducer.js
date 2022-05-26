import { GET_USER_REVIEWS } from '../constants'

const initialState = {
  data: []
}

const addresses = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case GET_USER_REVIEWS:
      return {
        ...state,
        data: payload.data
      }

    default:
      return state
  }
}

export default addresses
