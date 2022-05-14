const Brands = require('../services/brands.service')

const get = async (req, res) => {
  try {
    const retrievedBrands = await Brands.getAllBrands()
    retrievedBrands ? res.json(retrievedBrands) : res.status(404).json({ error: 'No brands where found' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const create = async (req, res) => {
  res.json({ message: 'THIS FUNCTION HAS NOT BEEN IMPLEMENTED YET' })
}

module.exports = {
  get,
  create
}
