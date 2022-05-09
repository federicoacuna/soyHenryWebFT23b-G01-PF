const { Category } = require('../db')

async function getAllCategories () {
  return await Category.findAll()
}

async function createCategory () {
  // placeholder
}

async function updateCategory () {
  // placeholder
}

async function removeCategory () {
  // placeholder
}

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  removeCategory
}
