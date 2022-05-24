const { Category } = require('../db')

async function getAllCategories () {
  return await Category.findAll({
    attributes: ['id', 'name']
  })
}

async function createCategory (data) {
  let { name } = data
  name = name.toLowerCase().split(' ').map(n => { return n.charAt(0).toUpperCase() + n.slice(1) }).join(' ')
  try {
    console.log('Estoy en Services:', name)
    const [, wasCreated] = await Category.findOrCreate({
      where: {
        name
      }
    })
    return wasCreated
  } catch (error) {
    console.log(error)
    return error
  }
}

async function removeCategory (id) {
  try {
    const wasDeleted = await Category.destroy({
      where: {
        id
      }
    })
    return wasDeleted
  } catch (error) {
    return error
  }
}

function updateCategory () {
  // placeholder
}

module.exports = {
  getAllCategories,
  createCategory,
  removeCategory,
  updateCategory
}
