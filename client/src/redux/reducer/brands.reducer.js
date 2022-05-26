import { GET_BRANDS } from '../constants'

const initialState = {
  data: []
}

const brands = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case GET_BRANDS:
      return {
        ...state,
        data: payload
      }

    default:
      return state
  }
}

export default brands
