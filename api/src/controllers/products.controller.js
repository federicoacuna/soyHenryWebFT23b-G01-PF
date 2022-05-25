const productsService = require('../services/products.service')

async function get (req, res, next) {
  try {
    const retrievedProducts = await productsService.getProducts(req.query)
    retrievedProducts ? res.status(200).json({ data: retrievedProducts }) : res.status(400).json({ error: 'No products where found' })
  } catch (error) {
    res.status(400).json(error)
  }
}
async function getById (req, res, next) {
  try {
    const retrievedProduct = await productsService.getProductDetail(req.params.id)

    if (req.user) {
      const user = req.user.email
      const canReview = await productsService.canReview(req.params.id, user)
      retrievedProduct.canReview = canReview
    }
    retrievedProduct ? res.status(200).json({ data: retrievedProduct }) : res.status(400).json({ error: 'Requested product was not found' })
  } catch (error) {
    res.status(400).json(error)
  }
}

async function create (req, res, next) {
  // placeholder
}

async function update (req, res, next) {
  // placeholder
}

async function remove (req, res, next) {
  // placeholder
}

module.exports = {
  get,
  create,
  update,
  remove,
  getById
}
