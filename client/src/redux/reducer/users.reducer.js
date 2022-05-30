import { LOG_IN, LOG_OUT, GET_USERS, UPDATE_USER_INFO } from '../constants'

const initialState = {
  data: [],
  user: {},
  token: window.localStorage.getItem('token') || ''
}

const users = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case LOG_IN:
      return {
        ...state,
        user: payload.data,
        token: payload.token
      }

    case LOG_OUT:
      return {
        ...state,
        userDetails: {},
        token: ''
      }

    case GET_USERS:
      return {
        ...state,
        data: payload
      }

    case UPDATE_USER_INFO:
      return {
        ...state,
        user: payload
      }

    default:
      return state
  }
}

export default users
