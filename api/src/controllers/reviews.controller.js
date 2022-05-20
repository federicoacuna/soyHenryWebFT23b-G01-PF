const Reviews = require('../services/reviews.service')

async function get (req, res, next) {
  try {
    const productId = req.params.id
    const email = req.user.email
    if (productId) {
      const reviewForProd = await Reviews.getReviewsForId(productId)
      reviewForProd ? res.json(reviewForProd) : res.status(404).json({ error: 'Reviews not found' })
    } else {
      const reviewForEmail = await Reviews.getReviewsForUserId(email)
      reviewForEmail ? res.json(reviewForEmail) : res.status(404).json({ error: 'You do not have reviews' })
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

async function create (req, res, next) {
  const email = req.user.email
  const data = req.body
  try {
    const review = await Reviews.createReview(email, data)
    review ? res.json(review) : res.status(400).json({ error: 'Error adding review' })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  get,
  create
}
