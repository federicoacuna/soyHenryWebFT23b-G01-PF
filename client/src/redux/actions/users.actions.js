import { sendToken, updateUser } from '../../services/users'
import { LOG_IN, LOG_OUT, UPDATE_USER_INFO, SET_TOAST } from '../constants'

export const logIn = (token) => {
  return async (dispatch) => {
    try {
      const user = await sendToken(token)

      dispatch({
        type: LOG_IN,
        payload: { user, token }
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

export const updateUserData = (newData) => {
  return async (dispatch) => {
    try {
      const updatedUser = await updateUser(newData)
      const toast = {
        title: 'Actualizado.',
        description: 'Ya tenemos tu nueva informacion guardada.',
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: UPDATE_USER_INFO,
        payload: updatedUser
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
