const { Product, Category, Brand, Review, User, Order, OrderItem } = require('../db')
const { Op } = require('sequelize')
const cloudinary = require('../config/cloudinary-config')

async function getProducts (options = {}) {
  const { search, brand, minPrice, maxPrice, category, sort, page = 1 } = options
  const itemsPerPage = 8
  const offset = itemsPerPage * (page - 1)
  const dbSearchOptions = {
    include: {
      model: Category,
      attributes: ['name']
    },
    limit: itemsPerPage,
    offset,
    where: {},
    order: [['id', 'ASC']]
  }
  search && (dbSearchOptions.where.name = { [Op.iLike]: `%${search}%` })
  brand && (dbSearchOptions.where.brandId = brand)
  minPrice && (dbSearchOptions.where.price = { [Op.gte]: minPrice })
  maxPrice && (dbSearchOptions.where.price = { [Op.lte]: maxPrice })
  minPrice && maxPrice && (dbSearchOptions.where.price = { [Op.between]: [minPrice, maxPrice] })
  category && (dbSearchOptions.where.categoryId = category)
  sort && (dbSearchOptions.order = [sort.split(',')])

  const results = await Product.findAndCountAll(dbSearchOptions)
  const pagination = {
    hasNext: results.count > itemsPerPage * page,
    hasPrevious: page > 1,
    currentPage: page
  }
  results.pagination = pagination
  return results
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

  const product = (await Product.findOne(dbSearchOptions)).toJSON()
  const reviews = await Review.findAll({ where: { productId: productID } })
  product.reviews = reviews

  return product
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

async function uploadImage (filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'e-commercepf'
  })
}

async function deleteImage (id) {
  return await cloudinary.uploader.destroy(id)
}

async function saveProduct (product) {
  let [savedProduct, category] = await Promise.all([Product.create(product), Category.findOne({ where: { id: product.categoryId } })])
  savedProduct = savedProduct.toJSON()
  savedProduct.category = { name: category.name }

  return savedProduct
}

async function updateProduct (newValues, id) {
  return await Product.update(newValues, { where: { id } })
}

async function removeProduct () {
  // placeholder function
}

module.exports = {
  getProducts,
  getProductDetail,
  canReview,
  uploadImage,
  deleteImage,
  saveProduct,
  updateProduct,
  removeProduct
}
