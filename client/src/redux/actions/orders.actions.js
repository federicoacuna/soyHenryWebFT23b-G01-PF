import { GET_ORDER_DETAILS } from '../constants'
import { getDetails } from '../../services/orders'

export const getOrderDetails = (orderId) => {
  return async (dispatch) => {
    try {
      const orderDetails = await getDetails(orderId)
      dispatch({
        type: GET_ORDER_DETAILS,
        payload: orderDetails
      })
    } catch (error) {
      dispatch({
        type: GET_ORDER_DETAILS,
        payload: error
      })
    }
  }
}
