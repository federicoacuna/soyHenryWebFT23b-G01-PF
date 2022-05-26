import { GET_WISHLIST } from '../constants'

const initialState = {
  data: []
}

const wishlist = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case GET_WISHLIST:
      return {
        ...state,
        data: payload.data
      }
    default:
      return state
  }
}

export default wishlist
