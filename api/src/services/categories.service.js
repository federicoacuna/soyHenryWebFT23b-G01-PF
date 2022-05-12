const { Category } = require('../db')

function getAllCategories () {
  return Category.findAll({
    attributes: ['id', 'name']
  })
}

function createCategory () {
  // placeholder
}

function updateCategory () {
  // placeholder
}

function removeCategory () {
  // placeholder
}

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  removeCategory
}
