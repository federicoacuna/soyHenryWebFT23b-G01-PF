import { GET_COUNTRIES } from '../constants'

const initialState = {
  data: []
}

const countries = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_COUNTRIES:
      return {
        ...state,
        data: payload.data
      }

    default:
      return state
  }
}

export default countries
