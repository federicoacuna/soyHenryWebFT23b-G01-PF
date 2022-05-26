import { postBranch, getBranches, putBranch, deleteBranch } from '../../services/branches'
import { GET_BRANCHES, SET_TOAST } from '../constants'

export const createNewBranch = (newBranch) => {
  return async (dispatch) => {
    try {
      const branchList = await postBranch(newBranch)
      const toast = {
        title: 'Sucursal Agregada!',
        description: 'Ya se podra operar con la misma.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: GET_BRANCHES,
        payload: branchList
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

export const updateBranch = (branchId) => {
  return async (dispatch) => {
    try {
      const response = await putBranch(branchId)
      const toast = {
        title: 'Sucursal Actualizada.',
        description: 'Ya se podra consulta la nueva informacion.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: GET_BRANCHES,
        payload: response
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
        duration: 6500,
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
      const response = await deleteBranch(branchId)
      const toast = {
        title: 'Sucursal Eliminada.',
        description: 'Ya no estara disponible para operar.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: GET_BRANCHES,
        payload: response
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
