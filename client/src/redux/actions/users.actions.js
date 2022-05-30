import { sendToken, updateUser, getUsers } from '../../services/users'
import { LOG_IN, LOG_OUT, UPDATE_USER_INFO, SET_TOAST, GET_USERS } from '../constants'

export const logIn = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await sendToken(token)

      dispatch({
        type: LOG_IN,
        payload: { data, token }
      })
    } catch (error) {
      const toast = {
        title: 'Ingreso Fallido.',
        description: 'Por favor vuelve a intentarlo',
        status: 'error',
        duration: 4500,
        isClosable: true
      }

      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    }
  }
}

export const logOut = () => {
  return {
    type: LOG_OUT
  }
}

export const getUsersList = (filters) => {
  return async (dispatch) => {
    try {
      const { data } = await getUsers(filters)

      dispatch({
        type: GET_USERS,
        payload: data
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No pudimos recuperar la lista de usuarios.',
        status: 'error',
        duration: 3500,
        isClosable: true
      }
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    }
  }
}

export const updateUserData = (newData) => {
  return async (dispatch) => {
    try {
      const { data, message } = await updateUser(newData)
      const toast = {
        title: 'Actualizado.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: UPDATE_USER_INFO,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error.',
        description: 'No pudimos actualizar tu informacion.',
        status: 'error',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    }
  }
}

export const adminUpdatesUserData = (newValues) => {
  return async (dispatch) => {
    try {
      const { data, message } = await updateUser(newValues)
      const toast = {
        title: 'Actualizado.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_USERS,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error.',
        description: 'No pudimos actualizar tu informacion.',
        status: 'error',
        duration: 3500,
        isClosable: true
      }
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    }
  }
}
