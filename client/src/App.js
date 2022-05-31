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
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import './App.css'

import { app } from './config/firebase-config' //eslint-disable-line
import store from './redux/store'
import Footer from './components/Footer'
import ChatBotContainer from './components/ChatBotContainer'
import WhatsAppButton from './components/WhatsAppButton'
import { getBranchesList } from './redux/actions/branches.actions'

function App () {
  store.subscribe(() =>
    window.localStorage.setItem('token', store.getState().users.token))

  store.subscribe(() =>
    window.localStorage.setItem('cart', JSON.stringify(store.getState().cart.localItems)))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBranchesList())
  }, [])// eslint-disable-line

  const branches = useSelector(state => state.branches.data)

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
      <ChatBotContainer />
      <WhatsAppButton branches={branches} />
      <Footer />
    </div>
  )
}

export default App
