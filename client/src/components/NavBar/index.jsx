import React from 'react'
import s from './index.module.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className={s.container}>
      <div>LOGO</div>
      <nav>
        <ul>
          <li><Link to=''>Contacto</Link></li>
          <li><Link to=''>Marcas</Link></li>
          <li><Link to=''>Productos</Link></li>
          <li><Link to=''>Home</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
