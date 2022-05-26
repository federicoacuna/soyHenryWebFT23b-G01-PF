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

const rootReducer = combineReducers({
  addresses,
  branches,
  brands,
  cart,
  categories,
  countries,
  orders,
  products,
  reviews,
  system,
  users,
  wishlist
})

export default rootReducer
