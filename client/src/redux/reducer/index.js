import { combineReducers } from 'redux'
import addresses from './addresses.reducer'
import branches from './branches.reducer'
import brands from './brands.reducer'
import cart from './cart.reducer'
import categories from './categories.reducer'
import countries from './countries.reducer'
import orders from './orders.reducer'
import products from './products.reducer'
import reviews from './reviews.reducer'
import system from './system.reducer'
import users from './users.reducer'
import wishlist from './wishlist.reducer'
import inventories from './inventories.reducer'
import buyNow from './buyNow.reducer'

const appReducer = combineReducers({
  addresses,
  branches,
  brands,
  cart,
  categories,
  countries,
  inventories,
  orders,
  products,
  reviews,
  system,
  users,
  wishlist,
  buyNow
})

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    return appReducer({
      brands: state.brands,
      categories: state.categories,
      products: state.products
    }, action)
  }

  return appReducer(state, action)
}
export default rootReducer
