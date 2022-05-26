import { CREATE_REVIEW, GET_USER_REVIEWS, SET_TOAST } from '../constants'
import { postReview, getReviews, putReview, deleteReview } from '../../services/reviews'

export const createReview = (newReview) => {
  return async (dispatch) => {
    try {
      const { data, message } = await postReview(newReview)
      const toast = {
        title: 'Reseña creada.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: CREATE_REVIEW,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      error.toast = {
        title: 'Error interno.',
        description: 'No pudimos guardar tu reseña.',
        status: 'error',
        duration: 3500,
        isClosable: true
      }
      dispatch({
        type: CREATE_REVIEW,
        payload: error
      })
    }
  }
}

export const getUserReviews = () => {
  return async (dispatch) => {
    try {
      const reviewsList = await getReviews()

      dispatch({
        type: GET_USER_REVIEWS,
        payload: reviewsList
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos obtener las reseñas.',
        status: 'error',
        duration: 4500,
        isClosable: true
      }

      dispatch({
        type: GET_USER_REVIEWS,
        payload: toast
      })
    }
  }
}

export const updateReview = (reviewId, newValues) => {
  return async (dispatch) => {
    try {
      const { data, message } = await putReview(reviewId, newValues)

      dispatch({
        type: GET_USER_REVIEWS,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: message
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos obtener las reseñas.',
        status: 'error',
        duration: 3500,
        isClosable: true
      }

      dispatch({
        type: GET_USER_REVIEWS,
        payload: toast
      })
    }
  }
}

export const removeReview = (reviewId) => {
  return async (dispatch) => {
    try {
      const { data, message } = await deleteReview(reviewId)

      dispatch({
        type: GET_USER_REVIEWS,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: message
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos obtener las reseñas.',
        status: 'error',
        duration: 3500,
        isClosable: true
      }
      dispatch({
        type: GET_USER_REVIEWS,
        payload: toast
      })
    }
  }
}
