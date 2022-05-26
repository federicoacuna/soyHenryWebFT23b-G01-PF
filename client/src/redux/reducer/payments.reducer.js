
import { GET_PAYMENTS } from '../constants'

const initialState = {
  payments: []
}

const payments = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case GET_PAYMENTS:
      return {
        ...state,
        payments: payload.data
      }

    default:
      return state
  }
}

export default payments
