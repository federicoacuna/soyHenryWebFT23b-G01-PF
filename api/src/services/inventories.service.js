const { Inventory, Product, Branch } = require('../db')
const { Op } = require('sequelize')

async function getAllProducts () {
  try {
    const branchs = await Branch.findAll()
    const stock = branchs.map(branch => branch.getStock())
    const result = await Promise.all(stock)
    return result
  } catch (error) {
    return error
  }
}

async function getProductExist (product) {
  try {
    const products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${product}%`
        }
      }
    })

    const stock = products.map(product => product.getStock())
    const result = await Promise.all(stock)
    return result
  } catch (error) {
    return error
  }
}

async function getStockBranch (branchId) {
  try {
    const branch = await Branch.findOne({ where: { id: branchId } })

    const stock = await branch.getStock()

    return stock
  } catch (error) {
    return error
  }
}

async function getStockProductBranch (product, branchId) {
  try {
    const branch = await Branch.findOne({ where: { id: branchId } })

    const stock = await branch.getStock({
      where: {
        name: {
          [Op.iLike]: `%${product}%`
        }
      }
    })

    return stock
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
