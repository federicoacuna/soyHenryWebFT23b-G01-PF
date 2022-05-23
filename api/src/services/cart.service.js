const { Product, CartItem } = require('../db')

async function getCartItems (userId) {
  try {
    const cartQuery = await CartItem.findAll({ where: { userId } })
    const query = await Product.findAll({
      where: { id: cartQuery.map(el => el.productId) },
      attributes: ['id', 'name', 'image', 'price']
    })
    return query
  } catch (error) {
    return error
  }
}

async function addCartItems (data) {
  try {
    const [, addedItem] = await CartItem.findOrCreate({
      where: {
        userId: data.userId,
        productId: data.productId
      }
    })
    return addedItem
  } catch (error) {
    return error
  }
}
async function addAllCart (data) {
  const productsId = data.products.map(el => { return { productId: el.id, userId: data.userId } })
  try {
    const addedProducts = await CartItem.bulkCreate(productsId)
    return addedProducts
  } catch (error) {
    return error
  }
}

async function removeItem (data) {
  try {
    const removedItem = await CartItem.destroy({
      where: {
        productId: data.productId,
        userId: data.userId
      }
    })
    return removedItem
  } catch (error) {
    return error
  }
}

async function removeAllCart (userId) {
  try {
    const removedCart = await CartItem.destroy({
      where: {
        userId
      }
    })
    return removedCart
  } catch (error) {
    return error
  }
}

module.exports = {
  getCartItems,
  addCartItems,
  removeItem,
  removeAllCart,
  addAllCart
}
