import CartButton from '../../components/CartButton'
import s from '../ProductDetail/index.module.css'

function ProductDetail () {
  const product = {
    id: 1,
    name: 'voluptatem necessitatibus optio nemo',
    description: 'Enim tempora et. Odio provident alias sed assumenda. Cumque illo repudiandae dolorum.',
    brand: 'Inc',
    model: '3vavcbu',
    price: '981.00',
    image: [
      'https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_SX679_.jpg'
    ],
    categories: [{ name: 'Laptops' }]
  }

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.col__1}>
          <img className={s.product__img} src={product.image[0]} alt={product.name} />
        </div>
        <div className={s.col__2}>
          <h1 className={s.product__title}>{product.name}</h1>
          <p className={s.product__price}>{product.price}</p>
          <p className={s.product__description}>{product.description}</p>
          <p className={s.product__brand}>{product.brand}</p>
          <p className={s.product__model}>{product.model}</p>
          <div className={s.product__categories}>
            {product.categories.map(({ id, name }) => (
              <p key={id + name}>{name}</p>
            ))}
          </div>
          <div className={s.cartButton}>
            <CartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
