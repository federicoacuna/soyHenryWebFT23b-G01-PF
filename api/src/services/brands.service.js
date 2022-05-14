const { Brand } = require('../db')

function getAllBrands () {
  return Brand.findAll({
    attributes: ['id', 'name']
  })
}

function createBrand () {
  // placeholder
}

function updateBrand () {
  // placeholder
}

function removeBrand () {
  // placeholder
}

module.exports = {
  getAllBrands,
  createBrand,
  updateBrand,
  removeBrand
}
