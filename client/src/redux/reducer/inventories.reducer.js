import { GET_ALL_INVENTORY, GET_ALL_STOCK_BRANCH, GET_PRODUCT_EXIST, GET_STOCK_PRODUCT_BRANCH, POST_PRODUCT_INVENTORY, PUT_PRODUCT_INVENTORY, CLEAN_INVENTORY } from '../constants'

const initialState = {
  inventoryTotal: [],
  inventoryBranchTotal: [],
  inventoryProductExist: {},
  inventoryProductBranch: [],
  inventoryPostProduct: {},
  inventoryPutProduct: {}
}

const inventories = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case GET_ALL_INVENTORY:
      return {
        ...state,
        inventoryTotal: payload
      }
    case GET_ALL_STOCK_BRANCH:
      return {
        ...state,
        inventoryBranchTotal: payload
      }
    case GET_PRODUCT_EXIST:
      return {
        ...state,
        inventoryProductExist: payload
      }
    case GET_STOCK_PRODUCT_BRANCH:
      return {
        ...state,
        inventoryProductBranch: payload
      }
    case POST_PRODUCT_INVENTORY:
      return {
        ...state,
        inventoryPostProduct: payload
      }
    case PUT_PRODUCT_INVENTORY:
      return {
        ...state,
        inventoryPutProduct: payload
      }
    case CLEAN_INVENTORY:
      return {
        ...state,
        inventoryTotal: []
      }

    default:
      return state
  }
}

export default inventories
