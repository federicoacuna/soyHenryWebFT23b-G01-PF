const cartService = require('../services/cart.service')
const userService = require('../services/users.service')
// get create remove removeAll

const get = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.user.email)
    const cart = await cartService.getCartItems(user.id)
    res.json(cart)
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
        userId: parseInt(user.id)

      }
      const addedItem = await cartService.addCartItems(data)
      addedItem ? res.json({ message: 'Item agregado con exito' }) : res.json({ message: 'El item ya fue agregado al carrito' })
    } else {
      const data = {
        products: req.body,
        userId: parseInt(user.id)
      }
      const addedProducts = await cartService.addAllCart(data)
      addedProducts ? res.json({ message: 'Items agregados con exito' }) : res.json({ message: 'Los items ya fueron agregados al carrito' })
    }
  } catch (error) {
    res.json(error)
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
    removedItem ? res.json({ message: 'Item removido con exito' }) : res.json({ message: 'El Item no se encuentra en carrito' })
  } catch (error) {
    res.json(error)
  }
}

const removeAll = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.user.email)
    const userId = parseInt(user.id)
    const removedCart = await cartService.removeAllCart(userId)
    removedCart ? res.json({ message: 'El carrito ha sido eliminado completamente' }) : res.json({ message: 'El carrito ya se encuentra vacio' })
  } catch (error) {
    res.json(error)
  }
}

module.exports = {
  get,
  create,
  remove,
  removeAll
}
