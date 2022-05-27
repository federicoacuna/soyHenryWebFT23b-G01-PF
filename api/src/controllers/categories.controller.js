const CategoriesService = require('../services/categories.service')

const get = async (req, res) => {
  try {
    const retrievedCategories = await CategoriesService.getAllCategories()
    retrievedCategories
      ? res.status(200).json({ data: retrievedCategories })
      : res.status(404).json({ error: 'No categories where found' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const create = async (req, res) => {
  try {
    const wasCreated = await CategoriesService.createCategory(req.body)
    const all = await CategoriesService.getAllCategories()
    wasCreated
      ? res.status(200).json({
        message: 'La categoría ha sido agregada exitosamente',
        data: all
      })
      : res.status(400).json({
        error: 'La categoría ya se encuentra registrada',
        data: all
      })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  const { categoryId } = req.params

  try {
    const wasDeleted = await CategoriesService.removeCategory(categoryId)
    const all = await CategoriesService.getAllCategories()
    wasDeleted > 0
      ? res.status(200).json({
        message: 'La categoría ha sido eliminada exitosamente',
        data: all
      })
      : res.status(400).json({
        error: 'La categoría no se pudo eliminar',
        data: all
      })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  get,
  create,
  remove
}
