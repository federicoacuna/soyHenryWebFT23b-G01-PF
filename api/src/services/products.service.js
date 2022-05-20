const { Product, Category, Brand } = require('../db')
const { Op } = require('sequelize')

async function getProducts (options) {
  const { search, brand, minPrice, maxPrice, category, sort } = options
  const dbSearchOptions = {
    include: {
      model: Category,
      attributes: ['name']
    },
    where: {}
  }
  search && (dbSearchOptions.where.name = { [Op.iLike]: `%${search}%` })
  brand && (dbSearchOptions.where.brandId = brand)
  minPrice && (dbSearchOptions.where.price = { [Op.gte]: minPrice })
  maxPrice && (dbSearchOptions.where.price = { [Op.lte]: maxPrice })
  minPrice && maxPrice && (dbSearchOptions.where.price = { [Op.between]: [minPrice, maxPrice] })
  category && (dbSearchOptions.where.categoryId = category)
  sort && (dbSearchOptions.order = [sort.split(',')])

  return await Product.findAll(dbSearchOptions)
}

async function getProductDetail (productID) {
  const dbSearchOptions = {
    include: [
      {
        model: Category,
        attributes: ['name', 'id']
      },
      {
        model: Brand,
        attributes: ['name', 'id']
      }
    ],
    where: {
      id: productID
    }
  }

  return await Product.findOne(dbSearchOptions)
}

async function updateProduct () {
  // placeholder function
}

async function removeProduct () {
  // placeholder function
}

module.exports = {
  getProducts,
  getProductDetail,
  updateProduct,
  removeProduct
}
