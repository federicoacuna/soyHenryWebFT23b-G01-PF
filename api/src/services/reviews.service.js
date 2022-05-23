const { User, Review, Order, OrderItem, Product } = require('../db')

async function getReviewsForUserId (email) {
  try {
    const user = await User.findOne({ where: { email } })
    const userId = user.id
    const reviewsForUser = await Review.findAll({ where: userId, raw: true })
    const productsReviewed = await Product.findAll({
      where: {
        id: reviewsForUser.map(review => review.productId)
      },
      raw: true
    })
    const results = reviewsForUser.map(review => {
      review.product = productsReviewed.find(product => product.id === review.productId)
      return review
    })
    return results
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
        let boolean = false
        orderItem.forEach(async (el) => {
          if (el.dataValues.productId === data.productId) {
            boolean = true
          }
        })
        if (boolean) {
          const idProduct = data.id
          // const ratingProduct = data.rating
          const newReview = await Review.findOrCreate({ where: { productId: data.productId, userId: user }, defaults: data })
          await updateRating(idProduct)
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
