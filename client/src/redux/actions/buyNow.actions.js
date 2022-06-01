import { ADD_BUY_NOW, REMOVE_BUY_NOW } from '../constants'

export const addBuyNowItem = (product) => {
  return {
    type: ADD_BUY_NOW,
    payload: product
  }
}

export const removeBuyNowItem = () => {
  return {
    type: REMOVE_BUY_NOW
  }
}
