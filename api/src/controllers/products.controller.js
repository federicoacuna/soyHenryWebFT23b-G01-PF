const productsService = require('../services/products.service')

async function get (req, res, next) {
  try {
    const retrievedProducts = await productsService.getProducts(req.query)
    retrievedProducts ? res.json(retrievedProducts) : res.status(404).json({ error: 'No products where found' })
  } catch (error) {
    res.json(error)
  }
}
async function getById (req, res, next) {
  try {
    let retrievedProduct = await productsService.getProductDetail(req.params.id)
    if (req.user) {
      const user = req.user.email
      const canReview = await productsService.canReview(req.params.id, user)
      retrievedProduct = retrievedProduct.toJSON()
      retrievedProduct.canReview = canReview
    }
    retrievedProduct ? res.json(retrievedProduct) : res.status(404).json({ error: 'Requested product was not found' })
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
