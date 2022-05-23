const { Product, Category, Brand, User, Order, OrderItem } = require('../db')
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

async function getProductDetail (productID, user) {
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

async function canReview (productId, email) {
  try {
    // console.log(productId)
    if (email) {
      let userId = await User.findOne({ where: { email } })
      userId = userId.id
      const userOrders = await Order.findAll({ where: { userId } })
      if (userOrders) {
        const orderId = userOrders.map(orden => orden.id)
        const orderItem = await OrderItem.findAll({ where: { orderId } })
        // console.log(orderItem)
        let boolean = false
        productId = Number(productId)
        orderItem.forEach((el) => {
          if (el.dataValues.productId === productId) {
            boolean = true
            return true
          }
        })
        // console.log(boolean)
        return boolean
      }
    }
  } catch (error) {
    return error
  }
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
  removeProduct,
  canReview
}
