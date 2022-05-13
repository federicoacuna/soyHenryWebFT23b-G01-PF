const Categories = require('../services/categories.service')

const get = async (req, res) => {
  try {
    const retrievedCategories = await Categories.getAllCategories()
    retrievedCategories ? res.json(retrievedCategories) : res.status(404).json({ error: 'No categories where found' })
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
