const { Product, Category, Brand } = require('../db')
const { faker } = require('@faker-js/faker')

const categories = [
  'Portátiles',
  'Mouses',
  'Teclados',
  'Monitores',
  'Headsets',
  'Webcams',
  'Tablets',
  'Smartphones',
  'Consolas',
  'Alfombrillas'
]

const brands = [
  'Dell',
  'HP',
  'Lenovo',
  'Asus',
  'Logitech',
  'Razer',
  'Predator',
  'Mintaka',
  'MSI',
  'LG',
  'Samsung',
  'Acer',
  'Apple',
  'Xiaomi'
]

const images = [
  // Laptops
  ['https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/81PbOX7ZtaL._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/71nz3cIcFOL._AC_SX679_.jpg'],
  // Mouses
  ['https://m.media-amazon.com/images/I/61MI2KPnKgL._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/614OAIJD7tL._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/61VwBIfNvJL._AC_SX679_.jpg'],
  // Teclados
  ['https://m.media-amazon.com/images/I/61hdRFcTkzL._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/61M8Wj7Ds6L._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/61w0BypBzrL._AC_SX679_.jpg'],
  // Monitores
  ['https://m.media-amazon.com/images/I/91ubktnbNVL._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/71mU5rpECpL._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/613QjYRkKqL._AC_SX679_.jpg'],
  // Headsets
  ['https://m.media-amazon.com/images/I/61Uviy0iWRL._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/51CSzjwiYyL._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/71g5MRbP52L._AC_SX679_.jpg'],
  // Webcams
  ['https://m.media-amazon.com/images/I/51rXag1Mg9S._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/61OQP2+yqML._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/61N5gyQPyPL._AC_SX679_.jpg'],
  // Tablets
  ['https://m.media-amazon.com/images/I/614M3bS7zBL._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/61nNYx6SdML._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/71jzm4PpqHL._AC_SX679_.jpg'],
  // Smartphones
  ['https://m.media-amazon.com/images/I/71jfKwFR1rL._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/61iJ6RQS-eL._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/716n8eAia+L._AC_SX679_.jpg'],
  // Consolas
  ['https://m.media-amazon.com/images/I/61k9NXMP82S._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/61y0N1Si-DL._SX522_.jpg',
    'https://m.media-amazon.com/images/I/6174zFQ0Z3L._AC_SX679_.jpg'],
  // Alfombrillas
  ['https://m.media-amazon.com/images/I/71JNnisTACL._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/817JBnouy6S._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/71OyF+xalUL._AC_SX679_.jpg']
]

const saveProducts = async () => {
  try {
    for (let i = 0; i < categories.length; i++) {
      await Category.create({ name: categories[i] })
    }

    for (let i = 0; i < brands.length; i++) {
      await Brand.create({ name: brands[i] })
    }

    for (let i = 0; i < categories.length; i++) {
      for (let j = 0; j < images[i].length; j++) {
        await Product.create({
          name: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          brand: faker.company.companySuffix(),
          model: faker.random.alphaNumeric(7),
          price: faker.commerce.price(15, 1000, 2),
          image: [images[i][j]],
          categoryId: i + 1,
          brandId: Math.floor(Math.random() * ((brands.length + 1) - 1) + 1)
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

saveProducts()
  .then(() => console.log('Productos creados'))
  .catch(error => console.log(error))
