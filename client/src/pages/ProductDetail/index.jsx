function ProductDetail ({ id, name, description, brand, model, price, img, categories }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{price}</p>
      <img src={img[0]} alt={name} />
      <p>{description}</p>
      <p>{brand}</p>
      <p>{model}</p>
      <div>
        {categories.map(({ id, name }) => (
          <p key={id + name}>{name}</p>
        ))}
      </div>
    </div>
  )
}

export default ProductDetail
