import { getProductsService } from '../../services/products'

import { GET_PRODUCTS } from '../constants'

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const products = await getProductsService()

      dispatch({
        type: GET_PRODUCTS,
        payload: products
      })
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS,
        payload: error.message
      })
    }
  }
}
