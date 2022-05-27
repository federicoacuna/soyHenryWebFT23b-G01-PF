import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Pagination from '../Pagination'
import ProductCard from '../ProductCard'
import { getProductsList } from './redux/actions/products.actions'
import styles from './index.module.css'

function ProductList () {
  const products = useSelector(state => state.products.data)
  const token = useSelector(state => state.users.token)
  const options = useSelector(state => state.products.filter)
  const dispatch = useDispatch()
  const shouldDisplay = !!token

  useEffect(() => {
    dispatch(getProductsList(options))
  }, [options])//eslint-disable-line

  if (products.message !== undefined) return <div>{products.message}</div>
  if (products.length === 0) return <div>No hay productos</div>

  return (
    <div className={styles.container}>
      <div className={styles['products-container']}>
        {Array.isArray(products) && products.map(product => (
          <ProductCard
            key={product.id + product.name}
            product={product}
            shouldDisplay={shouldDisplay}
          />
        ))}
      </div>
      <Pagination className={styles.pagination} />
    </div>
  )
}

export default ProductList
