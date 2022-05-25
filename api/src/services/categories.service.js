const { Category } = require('../db')

async function getAllCategories () {
  return await Category.findAll({
    where: { deleted: false },
    attributes: { exclude: ['deleted', 'createdAt', 'updatedAt'] }
  })
}

async function createCategory (data) {
  let { name } = data
  name = name.toLowerCase().split(' ').map(n => { return n.charAt(0).toUpperCase() + n.slice(1) }).join(' ')
  try {
    const [, wasCreated] = await Category.findOrCreate({
      where: {
        name
      }
    })
    return wasCreated
  } catch (error) {
    return error
  }
}

async function removeCategory (id) {
  try {
    const wasDeleted = await Category.update({ deleted: true }, {
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
