const inventoriesService = require('../services/inventories.service')

async function get (req, res) {
  try {
    const stock = await inventoriesService.getAllProducts()
    stock ? res.status(200).json(stock) : res.status(400).json({ error: 'El inventario esta vacio' })
  } catch (error) {
    res.status(400).json(error)
  }
}

async function getByQuery (req, res) {
  try {
    if (typeof req.query.product === 'string') {
      const stock = await inventoriesService.getProductExist(req.query.product)
      stock ? res.status(200).json(stock) : res.status(400).json({ error: 'No se encontraron productos' })
    } else if (!isNaN(parseInt(req.query.branchId))) {
      const stock = await inventoriesService.getStockBranch(parseInt(req.query.branchId))
      stock ? res.status(200).json(stock) : res.status(400).json({ error: 'No se encontraron productos en esta sucursal' })
    } else if (typeof req.query.product === 'string' && !isNaN(parseInt(req.query.branchId))) {
      const stock = await inventoriesService.getStockProductBranch(typeof req.query.product === 'string', parseInt(req.query.branchId))
      stock ? res.status(200).json(stock) : res.status(400).json({ error: 'No se encontraron productos ES MAGICO' })
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
