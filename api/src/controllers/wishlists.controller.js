const usersService = require('../services/users.service')
const wishList = require('../services/wishList.service.js')

async function create (req, res) {
  const user = await usersService.getUserByEmail(req.user.email)
  const newItem = req.body
  newItem.userId = user.id

  try {
    const wasCreated = await wishList.addToWishList(newItem)
    wasCreated ? res.json({ message: 'El item ha sido agregado con exito a favoritos' }) : res.status(404).json({ message: 'El item ya se encuentra en favoritos' })
  } catch (err) {
    res.status(400).json(err)
  }
}

async function erase (req, res) {
  const user = await usersService.getUserByEmail(req.user.email)
  const { productId } = req.params
  const item = { userId: user.id, productId }

  try {
    const wasDeleted = await wishList.removeFromWishList(item)
    wasDeleted ? res.json({ message: 'El item fue removido con exito' }) : res.status(404).json({ message: 'El item no se encuentra en favoritos' })
  } catch (err) {
    res.status(400).json(err)
  }
}

module.exports = {
  create,
  erase
}
