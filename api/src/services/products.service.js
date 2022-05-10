const { Product, Category } = require('../db')
const { Op } = require('sequelize')

async function getProducts (options) {
  const { searchQuery } = options

  const dbSearchOptions = {
    include: {
      model: Category,
      attributes: ['name']
    }
  }

  searchQuery && (dbSearchOptions.where = { name: { [Op.iLike]: `%${searchQuery}%` } })

  return await Product.findAll(dbSearchOptions)
}

async function getProductDetail (productID) {
  const dbSearchOptions = {
    include: {
      model: Category,
      attributes: ['name', 'id']
    },
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
