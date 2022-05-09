import axios from 'axios'
import { GET_PRODUCTS } from './constants'

export const getProducts = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('/products')
      if (response?.data) {
        dispatch({ type: GET_PRODUCTS, payload: { products: response.data } })
      }
    } catch (error) {
      return console.error('Error in GET PRODUCTS:', error)
    }
  }
}
