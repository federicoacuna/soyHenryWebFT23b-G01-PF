const { User, Review, Order, OrderItem, Product } = require('../db')

async function getReviewsForUserId (email) {
  try {
    let user = await User.findOne({ where: { email } })
    user = user.id
    const reviewsForUser = await Review.findAll({ where: { userId: user } })
    return reviewsForUser
  } catch (error) {
    return error
  }
}

async function getReviewsForId (id) {
  try {
    const reviews = await Review.findAll({ where: { productId: id } })
    return reviews
  } catch (error) {
    return error
  }
}

async function createReview (email, data) {
  try {
    let user = await User.findOne({ where: { email } })
    user = user.id
    if (user) {
      const userOrder = await Order.findAll({ where: { userId: user } }) // arreglo de obj orders
      if (userOrder) {
        const orderId = userOrder.map(orden => orden.id)
        const orderItem = await OrderItem.findAll({ where: { orderId } })
        // orderItem[0].dataValues.productId = 3
        let boolean = ''
        orderItem.forEach(async (el) => {
          if (el.dataValues.productId === data.productId) {
            boolean = true
          } else {
            boolean = false
          }
        })
        if (boolean) {
          const idProduct = data.id
          const ratingProduct = data.rating
          const newReview = await Review.findOrCreate({ where: { productId: data.productId, userId: user }, defaults: data })
          await updateRating(idProduct, ratingProduct)
          return newReview
        }
      }
    }
  } catch (error) {
    return error
  }
}

async function updateRating (id) {
  const reviews = await Review.findAll({ where: { productId: id } })
  const rating = reviews.reduce((acc, current) => acc + current, 0)
  await Product.update({ rating, where: { id } })
}

module.exports = {
  getReviewsForUserId,
  getReviewsForId,
  createReview
}

// orderItem.find(e => e[0].dataValues.productId === data.productId)
