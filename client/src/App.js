import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from './redux/actions/products.actions'
import { getCategoriesList } from './redux/actions/categories.actions'
import { getBrandsList } from './redux/actions/brands.action'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import UsersHome from './pages/UsersHome'
import AdminsHome from './pages/AdminsHome'
import Cart from './pages/Cart'
import ProductDetail from './components/ProductDetail'
import Addresses from './pages/Addresses'
import UserProfile from './pages/UserProfile'
import AddressCreator from './components/AddressCreator'
import ReviewCreator from './components/ReviewsCreator'
import OrderConfirmation from './components/OrderConfirmation'
import './App.css'

import { app } from './config/firebase-config' //eslint-disable-line
import store from './redux/store'
import Footer from './components/Footer'

function App () {
  const dispatch = useDispatch()
  const options = useSelector(state => state.products.filter)

  useEffect(() => {
    dispatch(getBrandsList())
    dispatch(getCategoriesList())
  }, [])//eslint-disable-line

  useEffect(() => {
    dispatch(getProductsList(options))
  }, [options])//eslint-disable-line

  store.subscribe(() =>
    window.localStorage.setItem('token', store.getState().users.token))

  store.subscribe(() =>
    window.localStorage.setItem('cartProducts', JSON.stringify(store.getState().cart.items)))

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<UsersHome />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/productDetail/:id' element={<ProductDetail />} />
        <Route exact path='/addresses' element={<Addresses />} />
        <Route exact path='/perfil' element={<UserProfile />} />
        <Route exact path='/createaddress' element={<AddressCreator />} />
        <Route exact path='/createreview/:productId' element={<ReviewCreator />} />
        <Route exact path='/administration' element={<AdminsHome />} />
        <Route path='/confirmation/:orderId' element={<OrderConfirmation />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
