const { WishList } = require('../db')

async function addToWishList (newItem) {
  const { userId, productId } = newItem
  const [, wasCreated] = await WishList.findOrCreate({
    where: {
      userId,
      productId
    },
    defaults: newItem
  })
  return wasCreated
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
    console.log(err)
  }
}

module.exports = { addToWishList, removeFromWishList }
