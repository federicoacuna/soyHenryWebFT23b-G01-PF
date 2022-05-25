import { GET_BRANCHES } from '../constants'

const initialState = {
  data: []
}

const branches = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case GET_BRANCHES:
      return {
        ...state,
        data: payload
      }

    default:
      return state
  }
}

export default branches
