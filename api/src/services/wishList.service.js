const { WishList } = require('../db')

async function addToWishList (newItem) {
  try {
    const [, wasCreated] = await WishList.findOrCreate({
      where: newItem
    })
    return wasCreated
  } catch (error) {
    return error
  }
}

async function removeFromWishList (item) {
  const { userId, productId } = item
  try {
    const wasDeleted = await WishList.destroy({
      where: {
        productId,
        userId
      }
    })

    return wasDeleted
  } catch (err) {
    return err
  }
}

async function getUserWishList (userId) {
  try {
    const wishList = await WishList.findAll({ where: { userId } })
    return wishList
  } catch (error) {
    return error
  }
}
module.exports = {
  addToWishList,
  removeFromWishList,
  getUserWishList
}
