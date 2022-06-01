import { GET_ALL_INVENTORY, GET_ALL_STOCK_BRANCH, GET_PRODUCT_EXIST, GET_STOCK_PRODUCT_BRANCH, POST_PRODUCT_INVENTORY, PUT_PRODUCT_INVENTORY, CLEAN_INVENTORY } from '../constants'
import { getProductExistService, getAllInventoryService, getAllStockBranchService, getStockProductBranchService, postProductInventory, putProductInventory } from '../../services/inventories'

export const postStock = (newStock) => {
  return async (dispatch) => {
    try {
      const product = await postProductInventory(newStock)

      dispatch({
        type: POST_PRODUCT_INVENTORY,
        payload: product
      })
    } catch (error) {
      return error
    }
  }
}

export const putStock = (product) => {
  return async (dispatch) => {
    try {
      const result = await putProductInventory(product)
      dispatch({
        type: PUT_PRODUCT_INVENTORY,
        payload: result
      })
    } catch (error) {
      return error
    }
  }
}

export const getProductExist = (options) => {
  return async (dispatch) => {
    try {
      const stock = await getProductExistService(options)
      dispatch({
        type: GET_PRODUCT_EXIST,
        payload: stock
      })
    } catch (error) {
      return error
    }
  }
}

export const getAllInventory = () => {
  return async (dispatch) => {
    try {
      const stock = await getAllInventoryService()
      dispatch({
        type: GET_ALL_INVENTORY,
        payload: stock
      })
    } catch (error) {
      return error
    }
  }
}

export const getAllStockBranch = (branchId) => {
  return async (dispatch) => {
    try {
      const stock = await getAllStockBranchService(branchId)
      dispatch({
        type: GET_ALL_STOCK_BRANCH,
        payload: stock
      })
    } catch (error) {
      return error
    }
  }
}

export const getStockProductBranch = (options, branchId) => {
  return async (dispatch) => {
    try {
      const stock = await getStockProductBranchService(options, branchId)
      dispatch({
        type: GET_STOCK_PRODUCT_BRANCH,
        payload: stock
      })
    } catch (error) {
      return error
    }
  }
}

export const cleanInventory = () => {
  return {
    type: CLEAN_INVENTORY,
    payload: []
  }
}
