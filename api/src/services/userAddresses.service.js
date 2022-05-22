const { UserAddress } = require('../db')

async function getUserAddresses (userId) {
  const userAddresses = await UserAddress.findAll({
    where: { userId }
  })

  return userAddresses
}

async function createAddress (newAddress) {
  newAddress.userId = parseInt(newAddress.userId)
  const { userId, postalCode, state, city, streetName, houseNumber } = newAddress

  try {
    const [, wasCreated] = await UserAddress.findOrCreate({
      where: {
        userId,
        postalCode,
        state,
        city,
        streetName,
        houseNumber
      },
      defaults: newAddress
    })

    return wasCreated
  } catch (error) {
    console.log(error)
  }
}

async function removeAddress (addressId) {
  const [updatedRows] = await UserAddress.update({
    deleted: true
  },
  {
    where: { id: addressId }
  })

  return updatedRows === 1
}

module.exports = {
  getUserAddresses,
  createAddress,
  removeAddress
}
