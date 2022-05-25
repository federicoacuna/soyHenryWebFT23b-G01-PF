import { GET_ADDRESSES } from '../constants'

const initialState = {
  data: []
}

const addresses = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case GET_ADDRESSES:
      return {
        ...state,
        data: payload
      }

    default:
      return state
  }
}

export default addresses
