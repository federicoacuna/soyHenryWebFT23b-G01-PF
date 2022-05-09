import React from 'react'
import s from './index.module.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className={s.container}>
      <div>LOGO</div>
      <nav>
        <ul>
          <li><Link>Contacto</Link></li>
          <li><Link>Marcas</Link></li>
          <li><Link>Productos</Link></li>
          <li><Link>Home</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
