import { subscribeNewsletter } from '../../services/nodemailer'
import { SET_TOAST } from '../constants'

export const sendEmail = (email) => {
  return async (dispatch) => {
    try {
      const { message } = await subscribeNewsletter(email)
      const toast = {
        title: 'Te has suscrito con exito!!',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No pudimos suscribirte',
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
