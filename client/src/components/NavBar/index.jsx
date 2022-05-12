import React from 'react'
import s from './index.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import Cart from '../Cart'

const NavBar = () => {
  const cartProducts = useSelector(state => state.cartProducts.reduce((acc, curr) => acc + curr.quantity, 0))

  return (
    <div className={s.container}>
      <div><Link to='/'>LOGO</Link></div>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          {/* <li><Link to=''>Productos</Link></li>
          <li><Link to=''>Marcas</Link></li>
          <li><Link to=''>Contacto</Link></li> */}
          <li>
            <Link to='/cart'><button>{cartProducts}🛒Carrito</button></Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
