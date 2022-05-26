import { SET_TOAST, SET_USERS_TAB, SET_ADMINS_TAB } from '../constants'

const initialState = {
  usersPanelSelectedTab: 0,
  adminsPanelSelectedTab: 0,
  toast: {}
}

const system = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case SET_USERS_TAB:
      return {
        ...state,
        usersPanelSelectedTab: payload
      }
    case SET_ADMINS_TAB:
      return {
        ...state,
        adminsPanelSelectedTab: payload
      }
    case SET_TOAST:
      return {
        ...state,
        toast: payload
      }
    default:
      return state
  }
}

export default system
