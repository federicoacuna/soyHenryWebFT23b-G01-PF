const services = require('../services/products.services')

async function get (req, res, next) {
  try {
    res.json(await services.getProducts(req.query))
  } catch (error) {
    console.log('error trying to execute getProducts')
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
  remove
}
