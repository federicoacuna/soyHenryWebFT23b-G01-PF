const cartService = require('../services/cart.service')
const userService = require('../services/users.service')

const get = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.user.email)
    const cart = await cartService.getCartItems(user.id)
    res.status(200).json({ data: cart })
  } catch (err) {
    res.status(404).json(err)
  }
}

const create = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.user.email)
    if (req.params.productId) {
      const data = {
        productId: parseInt(req.params.productId),
        userId: parseInt(user.id),
        quantity: 1
      }
      const addedItem = await cartService.addCartItems(data)
      const newCart = await cartService.getCartItems(user.id)
      addedItem
        ? res.status(200).json({
          message: 'Producto agregado al carrito',
          data: newCart
        })
        : res.status(400).json({
          message: 'El producto ya se encuentra en el carrito',
          data: newCart
        })
    } else {
      const data = req.body.map(item => {
        item.userId = user.id
        return item
      })
      await cartService.removeAllCart(user.id)
      const addedProducts = await cartService.addAllCart(data)
      const newCart = await cartService.getCartItems(user.id)
      addedProducts
        ? res.json({
          message: 'Items agregados con exito',
          data: newCart
        })
        : res.json({
          message: 'No se puedo agregar los items al carrito',
          data: newCart
        })
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
}

const updateCart = async (req, res) => {
  const updateInfo = req.body.slice()
  try {
    const user = await userService.getUserByEmail(req.user.email)
    if (!_validateMerge(updateInfo, user.id)) {
      return res.status(404).json({ message: 'Informacion invalida para realizar merge' })
    }
    const localCart = updateInfo.map(item => {
      item.userId = user.id
      return item
    })
    const mergedCart = await cartService.mergeCarts(localCart, user.id)
    mergedCart
      ? res.json({
        message: 'Los carritos fueron combinados!',
        data: mergedCart
      })
      : res.status(500).json({
        message: 'No se pudieron combinarse los carritos',
        data: mergedCart
      })
  } catch (error) {
    res.status(400).json(error.message)
  }
}

function _validateMerge (localCart, userId) {
  if (!Array.isArray(localCart) || !localCart.length) return false
  localCart = localCart.map(item => {
    const newItem = {
      productId: item.id,
      quantity: item.quantity,
      userId
    }
    return newItem
  })
  let valid = true
  localCart.forEach(item => {
    item.productId || (valid = false)
    item.quantity || (valid = false)
  })
  return valid
}

const remove = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.user.email)
    const data = {
      productId: parseInt(req.params.productId),
      userId: parseInt(user.id)
    }
    const removedItem = await cartService.removeItem(data)
    const newCart = await cartService.getCartItems(user.id)
    removedItem > 0
      ? res.status(200).json({
        message: 'Item removido con exito',
        data: newCart
      })
      : res.status(400).json({
        message: 'El Item no se encuentra en carrito',
        data: newCart
      })
  } catch (error) {
    res.status(400).json(error.message)
  }
}

const removeAll = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.user.email)
    const userId = parseInt(user.id)
    const removedCart = await cartService.removeAllCart(userId)
    const newCart = await cartService.getCartItems(user.id)
    removedCart > 0
      ? res.status(200).json({
        message: 'El carrito ha sido limpiado completamente',
        data: newCart
      })
      : res.status(400).json({
        message: 'El carrito ya se encuentra vacio',
        data: newCart
      })
  } catch (error) {
    res.status(400).json(error.message)
  }
}

module.exports = {
  get,
  create,
  updateCart,
  remove,
  removeAll
}
