const Reviews = require('../services/reviews.service')

async function get (req, res, next) {
  try {
    const productId = req.params.id
    const email = req.user.email
    if (productId) {
      const reviewForProd = await Reviews.getReviewsForId(productId)
      reviewForProd.length ? res.json(reviewForProd) : res.status(404).json({ error: 'Reviews not found' })
    } else {
      const reviewForEmail = await Reviews.getReviewsForUserId(email)
      reviewForEmail
        ? res.json([{
          rating: 5,
          review: 'Esta muy piola el producto',
          product: {
            id: 4,
            name: 'DestapaCorchos',
            image: 'IMAGEN'
          }
        },
        {
          rating: 4,
          review: 'Esta medio piola el producto',
          product: {
            id: 2,
            name: 'Destapa Birras',
            image: 'IMAGEN'
          }
        },
        {
          rating: 4,
          review: 'Esta bastante piola el producto',
          product: {
            id: 9,
            name: 'Soga de perro',
            image: 'IMAGEN'
          }
        }])
        : res.json([{
          rating: 5,
          review: 'Esta muy piola el producto',
          product: {
            id: 4,
            name: 'DestapaCorchos',
            image: 'IMAGEN'
          }
        },
        {
          rating: 4,
          review: 'Esta medio piola el producto',
          product: {
            id: 2,
            name: 'Destapa Birras',
            image: 'IMAGEN'
          }
        },
        {
          rating: 4,
          review: 'Esta bastante piola el producto',
          product: {
            id: 9,
            name: 'Soga de perro',
            image: 'IMAGEN'
          }
        }])
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
