
function ProductDetail () {
  const product = {
    id: 1,
    name: 'voluptatem necessitatibus optio nemo',
    description: 'Enim tempora et. Odio provident alias sed assumenda. Cumque illo repudiandae dolorum.',
    brand: 'Inc',
    model: '3vavcbu',
    price: '981.00',
    img: [
      'https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_SX679_.jpg'
    ],
    categories: [{ name: 'Laptops' }]
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <img src={product.img[0]} alt={product.name} />
      <p>{product.description}</p>
      <p>{product.brand}</p>
      <p>{product.model}</p>
      <div>
        {product.categories.map(({ id, name }) => (
          <p key={id + name}>{name}</p>
        ))}
      </div>
    </div>
  )
}

export default ProductDetail
