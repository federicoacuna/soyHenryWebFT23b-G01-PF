import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getProducts, setCartProducts } from './redux/actions'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import UsersHome from './pages/UsersHome'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import './App.css'

function App () {
  const dispatch = useDispatch()
  const cartProducts = useSelector(state => state.cartProducts)
  const options = useSelector(state => state.options)

  useEffect(() => {
    const cartProducts = JSON.parse(window.localStorage.getItem('cartProducts')) || []
    dispatch(setCartProducts(cartProducts))
    dispatch(getCategories())
  }, [])//eslint-disable-line

  useEffect(() => {
    window.localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
  }, [cartProducts])

  useEffect(() => {
    dispatch(getProducts(options))
  }, [options])//eslint-disable-line

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<UsersHome />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/productDetail/:id' element={<ProductDetail />} />
      </Routes>
    </div>
  )
}

export default App
