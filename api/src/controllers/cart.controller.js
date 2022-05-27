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
          message: 'Item agregado con exito',
          data: newCart
        })
        : res.status(400).json({
          message: 'El item ya fue agregado al carrito',
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

const updateQuantity = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.user.email)
    req.body.userId = user.id
    const updated = await cartService.updateItemQuantity(req.body)
    const newCart = await cartService.getCartItems(user.id)
    updated
      ? res.status(200).json({
        message: 'Item actualizado con exito',
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
  updateQuantity,
  remove,
  removeAll
}
