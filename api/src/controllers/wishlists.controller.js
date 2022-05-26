const usersService = require('../services/users.service')
const wishListService = require('../services/wishList.service.js')

async function get (req, res) {
  try {
    const user = await usersService.getUserByEmail(req.user.email)
    const wishList = await wishListService.getUserWishList(user.id)
    res.status(200).json({ data: wishList })
  } catch (error) {
    res.status(400).json(error)
  }
}

async function create (req, res) {
  const user = await usersService.getUserByEmail(req.user.email)
  const item = {
    productId: req.body.productId,
    userId: user.id
  }

  try {
    const wasCreated = await wishListService.addToWishList(item)
    const newWishList = await wishListService.getUserWishList(user.id)
    wasCreated
      ? res.status(200).json({
        message: 'El item ha sido agregado con exito a favoritos',
        data: newWishList
      })
      : res.status(400).json({
        error: 'El item ya se encuentra en favoritos',
        data: newWishList
      })
  } catch (err) {
    res.status(400).json(err)
  }
}

async function erase (req, res) {
  const user = await usersService.getUserByEmail(req.user.email)
  const item = {
    productId: req.params.productId,
    userId: user.id
  }

  try {
    const wasDeleted = await wishListService.removeFromWishList(item)
    const newWishList = await wishListService.getUserWishList(user.id)
    wasDeleted
      ? res.status(200).json({
        message: 'El item ha sido eliminado con exito a favoritos',
        data: newWishList
      })
      : res.status(400).json({
        error: 'El item no se encuentra en favoritos',
        data: newWishList
      })
  } catch (err) {
    res.status(400).json(err)
  }
}

module.exports = {
  create,
  erase,
  get
}
