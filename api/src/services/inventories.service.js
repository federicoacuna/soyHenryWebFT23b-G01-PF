const { Inventory } = require('../db')

async function getAllProducts () {
  const result = await Inventory.findAll()
  return result
}

async function getProductExist (productId) {
  try {
    const result = await Inventory.findAll({ where: { productId } })
    if (result) {
      return result
    }
  } catch (error) {
    return error
  }
}

async function getStockBranch (branchId) {
  try {
    const result = await Inventory.findAll({ where: { branchId } })
    if (result) {
      return result
    }
  } catch (error) {
    return error
  }
}

async function getStockProductBranch (productId, branchId) {
  try {
    const result = await Inventory.findOne({ where: { productId, branchId } })
    if (result) {
      return result
    }
  } catch (error) {
    return error
  }
}

async function createItemInventory (productId, branchId, quantity) {
  try {
    const existe = await Inventory.findOne({ where: { productId, branchId } })
    if (existe) {
      return 'existe'
    }

    const result = await Inventory.create({
      productId,
      branchId,
      stock: quantity
    })
    return result
  } catch (error) {
    return error
  }
}

async function editItemInventory (productId, branchId, quantity) {
  try {
    const result = await Inventory.update({ stock: quantity }, { where: { productId, branchId } })
    return result
  } catch (error) {
    return error
  }
}

module.exports = {
  getAllProducts,
  getProductExist,
  getStockBranch,
  getStockProductBranch,
  createItemInventory,
  editItemInventory
}
