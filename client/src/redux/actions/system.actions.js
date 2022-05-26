import { SET_USERS_TAB, SET_ADMINS_TAB } from '../constants'

export const setUsersPanelTab = (tabIndex) => {
  return {
    type: SET_USERS_TAB,
    payload: tabIndex
  }
}

export const setAdminsPanelTab = (tabIndex) => {
  return {
    type: SET_ADMINS_TAB,
    payload: tabIndex
  }
}
