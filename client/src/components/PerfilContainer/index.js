import React, { useState } from 'react'
import s from './index.module.css'

export default function PerfilContainer () {
  const [state, setState] = useState('Datos Personales')

  function handleClick (e) {
    if (e.target.textContent === 'Datos Personales') {
      setState('Datos Personales')
    } else if (e.target.textContent === 'Historial') {
      setState('Historial')
    } else if (e.target.textContent === 'Direcciones de envio') {
      setState('Direcciones de envio')
    } else if (e.target.textContent === 'Metodos de pago') {
      setState('Metodos de pago')
    } else if (e.target.textContent === 'Mis compras') {
      setState('Mis compras')
    } else if (e.target.textContent === 'Wishlist') {
      setState('Wishlist')
    } else if (e.target.textContent === 'Mis reviews') {
      setState('Mis reviews')
    }
  }
  return (
    <div className={s.container}>
      <div className={s.navbarColumn}>
        <nav>
          <ul>
            <li onClick={handleClick}>Datos Personales</li>
            <li onClick={handleClick}>Historial</li>
            <li onClick={handleClick}>Direcciones de envio</li>
            <li onClick={handleClick}>Metodos de pago</li>
            <li onClick={handleClick}>Mis compras</li>
            <li onClick={handleClick}>Wishlist</li>
            <li onClick={handleClick}>Mis reviews</li>
          </ul>

        </nav>
      </div>
      <div className={s.renderComponent}>
        {state === 'Datos Personales'
          ? <div>datos personales</div>
          : state === 'Historial'
            ? <div>historial</div>
            : state === 'Direcciones de envio'
              ? <div>Direcciones de envio</div>
              : state === 'Metodos de pago'
                ? <div>Metodos de pago</div>
                : state === 'Mis compras'
                  ? <div>Mis compras</div>
                  : state === 'Wishlist'
                    ? <div>Wishlist</div>
                    : state === 'Mis reviews'
                      ? <div>Mis reviews</div>
                      : null}
      </div>
    </div>
  )
}
