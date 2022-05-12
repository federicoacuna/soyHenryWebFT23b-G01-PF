import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, setCartProducts } from './redux/actions'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import UsersHome from './pages/UsersHome'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import './App.css'

function App () {
  const dispatch = useDispatch()
  const cartProducts = useSelector(state => state.cartProducts)

  useEffect(() => {
    dispatch(getProducts())
    const cartProducts = JSON.parse(window.localStorage.getItem('cartProducts')) || []
    dispatch(setCartProducts(cartProducts))
  }, [])//eslint-disable-line

  useEffect(() => {
    window.localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
  }, [cartProducts])

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<UsersHome />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/productDetail' element={<ProductDetail />} />
      </Routes>
    </div>
  )
}

export default App
