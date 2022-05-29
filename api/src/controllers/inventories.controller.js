const inventoriesService = require('../services/inventories.service')

async function get (req, res) {
  try {
    const result = await inventoriesService.getAllProducts()
    result ? res.status(200).json(result) : res.status(400).json({ error: 'El inventario esta vacio' })
  } catch (error) {
    res.status(400).json(error)
  }
}

async function getByQuery (req, res) {
  console.log(req.query.productId)
  try {
    if (req.query.productId && !isNaN(parseInt(req.query.productId))) {
      const result = await inventoriesService.getProductExist(parseInt(req.query.productId))
      result ? res.status(200).json(result) : res.status(400).json({ error: 'No se encontro el producto' })
    } else if (req.query.branchId && !isNaN(parseInt(req.query.branchId))) {
      const result = await inventoriesService.getStockBranch(parseInt(req.query.branchId))
      result ? res.status(200).json(result) : res.status(400).json({ error: 'No hay productos en esta sucursal' })
    } else if (req.query.productId && req.query.branchId && !isNaN(parseInt(req.query.productId)) && !isNaN(parseInt(req.query.branchId))) {
      const result = await inventoriesService.getStockProductBranch(parseInt(req.query.productId), parseInt(req.query.branchId))
      result ? res.status(200).json(result) : res.status(400).json({ error: 'No existe ese producto en esta sucursal' })
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

async function create (req, res) {
  const { productId, branchId, quantity } = req.body

  if (isNaN(parseInt(productId)) || isNaN(parseInt(branchId)) || isNaN(parseInt(quantity))) {
    return res.status(400).json({ error: 'Algunos de los datos o todos son invalidos' })
  }

  try {
    const result = await inventoriesService.createItemInventory(productId, branchId, quantity)

    if (result) {
      if (result === 'existe') {
        return res.status(400).json({ error: 'El item ya existe en el inventario' })
      } else {
        return res.status(200).json({ data: result, message: 'Item agregado al inventario' })
      }
    }
  } catch (error) {
    return error
  }
}

async function update (req, res) {
  const { productId, branchId, quantity } = req.body

  if (isNaN(parseInt(productId)) || isNaN(parseInt(branchId)) || isNaN(parseInt(quantity))) {
    return res.status(400).json({ error: 'Algunos de los datos o todos son invalidos' })
  }

  try {
    const result = await inventoriesService.editItemInventory(parseInt(productId), parseInt(branchId), parseInt(quantity))

    result > 0 ? res.status(200).json({ message: 'El producto se ha modificado correctamente' }) : res.status(400).json({ error: 'No se pudo editar el producto' })
  } catch (error) {
    return error
  }
}

module.exports = {
  get,
  getByQuery,
  create,
  update
}
