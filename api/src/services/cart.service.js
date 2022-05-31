const { Product, CartItem } = require('../db')

async function getCartItems (userId) {
  try {
    const cart = await CartItem.findAll({ where: { userId }, raw: true })
    let cartItems = await Product.findAll({
      where: { id: cart.map(el => el.productId) },
      attributes: ['id', 'name', 'image', 'price'],
      raw: true
    })
    cartItems = cartItems.map(item => {
      cart.forEach(product => {
        if (item.id === product.productId) {
          item.quantity = product.quantity
        }
      })
      return item
    })
    return cartItems
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
      },
      defaults: data
    })
    return addedItem
  } catch (error) {
    return error
  }
}

async function addAllCart (data) {
  try {
    const addedProducts = await CartItem.bulkCreate(data)
    return addedProducts
  } catch (error) {
    return error
  }
}

async function updateItemQuantity (itemList) {
  try {
    const [updatedRows] = await CartItem.update(itemList, {
      where: {
        userId: itemList.userId,
        productId: itemList.productId
      }
    })

    return updatedRows
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

async function mergeCarts (localCart, userId) {
  try {
    let currentCart = await getCartItems(userId)
    await removeAllCart(userId)
    currentCart = currentCart.map(item => {
      return {
        productId: item.id,
        userId,
        quantity: item.quantity
      }
    })
    localCart.forEach(item => {
      const colissionItem = currentCart.find(currentItem => currentItem.productId === item.id)
      if (colissionItem) {
        colissionItem.quantity = colissionItem.quantity + item.quantity
      } else {
        currentCart.push({
          productId: item.id,
          userId,
          quantity: item.quantity
        })
      }
    })
    await addAllCart(currentCart)
    const newCart = await getCartItems(userId)
    return newCart
  } catch (error) {
    return error
  }
}

module.exports = {
  getCartItems,
  addCartItems,
  updateItemQuantity,
  removeItem,
  removeAllCart,
  addAllCart,
  mergeCarts
}
