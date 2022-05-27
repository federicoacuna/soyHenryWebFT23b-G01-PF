const Reviews = require('../services/reviews.service')

async function get (req, res, next) {
  try {
    const productId = req.params.id
    const email = req.user.email
    if (productId) {
      const reviewForProd = await Reviews.getReviewsForId(productId)
      reviewForProd.length
        ? res.status(200).json({ data: reviewForProd })
        : res.status(400).json({ error: 'Reviews not found' })
    } else {
      const reviewForEmail = await Reviews.getReviewsForUserId(email)
      reviewForEmail
        ? res.status(200).json({ data: reviewForEmail })
        : res.status(404).json({ error: 'Reviews not found' })
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

async function create (req, res, next) {
  const email = req.user.email
  const data = req.body
  try {
    await Reviews.createReview(email, data)
    const reviewForEmail = await Reviews.getReviewsForUserId(email)
    reviewForEmail
      ? res.status(200).json({ data: reviewForEmail, message: 'Review added successfuly' })
      : res.status(400).json({ error: 'Error adding review' })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  get,
  create
}
