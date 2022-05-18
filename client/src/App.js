import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands, getCategories, getProducts, setCartProducts } from './redux/actions'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import UsersHome from './pages/UsersHome'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import Addresses from './pages/Addresses'
import Perfil from './pages/Perfil'
import './App.css'

import { app } from './config/firebase-config' //eslint-disable-line
import Payment from './pages/Payment'
import store from './redux/store'

function App () {
  const dispatch = useDispatch()
  const cartProducts = useSelector(state => state.cartProducts)
  const options = useSelector(state => state.options)

  useEffect(() => {
    const cartProducts = JSON.parse(window.localStorage.getItem('cartProducts')) || []
    dispatch(setCartProducts(cartProducts))
    dispatch(getBrands())
    dispatch(getCategories())
  }, [])//eslint-disable-line

  useEffect(() => {
    window.localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
  }, [cartProducts])

  useEffect(() => {
    dispatch(getProducts(options))
  }, [options])//eslint-disable-line

  store.subscribe(() =>
    window.localStorage.setItem('token', store.getState().token))

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<UsersHome />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/productDetail/:id' element={<ProductDetail />} />
        <Route exact path='/payment' element={<Payment />} />
        <Route exact path='/addresses' element={<Addresses />} />
        <Route exact path='/perfil' element={<Perfil />} />
      </Routes>
    </div>
  )
}

export default App
