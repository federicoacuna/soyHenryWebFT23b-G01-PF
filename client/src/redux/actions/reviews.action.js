import { CREATE_REVIEW } from '../constants'
import { postReview } from '../../services/reviews'

export const createReview = (newReview) => {
  console.log('action', newReview)
  return async (dispatch) => {
    try {
      const response = await postReview(newReview)
      console.log(response)
      response.toast = {
        title: 'Reseña creada.',
        description: 'Te agradecemos tus comentarios!',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: CREATE_REVIEW,
        payload: response
      })
    } catch (error) {
      console.log('SE ROMPE TODO')
      error.toast = {
        title: 'Error interno.',
        description: 'No pudimos guardar tu direccion.',
        status: 'error',
        duration: 4500,
        isClosable: true
      }
      dispatch({
        type: CREATE_REVIEW,
        payload: error
      })
    }
  }
}
