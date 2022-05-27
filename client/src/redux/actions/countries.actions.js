import { GET_COUNTRIES, SET_TOAST } from '../constants'
import { getCountries } from '../../services/countries'

export const getCountriesList = () => {
  return async (dispatch) => {
    try {
      const countriesList = await getCountries()

      dispatch({
        type: GET_COUNTRIES,
        payload: countriesList
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No pudimos recuperar la lista de paises.',
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
