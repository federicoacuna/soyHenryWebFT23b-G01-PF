import { postBranch, getBranches, putBranch, deleteBranch } from '../../services/branches'
import { GET_BRANCHES, SET_TOAST } from '../constants'

export const createNewBranch = (newBranch) => {
  return async (dispatch) => {
    try {
      const { data, message } = await postBranch(newBranch)
      const toast = {
        title: 'Sucursal Agregada!',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_BRANCHES,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No pudimos guardar la sucursal.',
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

export const getBranchesList = () => {
  return async (dispatch) => {
    try {
      const branchList = await getBranches()

      dispatch({
        type: GET_BRANCHES,
        payload: branchList
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No pudimos recuperar la lista de sucursales.',
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

export const updateBranch = (newValues) => {
  return async (dispatch) => {
    try {
      const { data, message } = await putBranch(newValues)
      const toast = {
        title: 'Sucursal Actualizada.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_BRANCHES,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos actualizar la sucursal.',
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

export const removeBranch = (branchId) => {
  return async (dispatch) => {
    try {
      const { data, message } = await deleteBranch(branchId)
      const toast = {
        title: 'Sucursal Eliminada.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_BRANCHES,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos eliminar la sucursal.',
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
