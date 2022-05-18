import React from 'react'
import s from './index.module.css'

export default function PerfilContainer () {
  return (
    <div className={s.container}>
      <div className={s.navbarColumn}>
        <nav>
          <ul>
            <li>Datos Personales</li>
            <li>Historial</li>
            <li>Direcciones de envio</li>
            <li>Metodos de pago</li>
            <li>Mis compras</li>
            <li>Wishlist</li>
            <li>Mis reviews</li>
          </ul>

        </nav>
      </div>
      <div className={s.renderComponent}>
        ACA SE RENDERIZA LA OPCION SELECCIONADA
      </div>
    </div>
  )
}
