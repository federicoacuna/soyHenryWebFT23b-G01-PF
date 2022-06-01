import { ADD_BUY_NOW, REMOVE_BUY_NOW } from '../constants'

const initialState = {
  item: []
}

const buyNowItem = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_BUY_NOW:
      return {
        ...state,
        item: payload
      }

    case REMOVE_BUY_NOW:
      return {
        ...state,
        item: []
      }

    default: return state
  }
}

export default buyNowItem
