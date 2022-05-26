const { UserAddress, Country } = require('../db')

async function getUserAddresses (userId) {
  try {
    const userAddresses = await UserAddress.findAll({
      where: { userId },
      include: {
        model: Country
      }
    })

    return userAddresses
  } catch (error) {
    return error
  }
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
    return error
  }
}

async function removeAddress (addressId) {
  try {
    const updatedRows = await UserAddress.update({
      deleted: true
    },
    {
      where: { id: addressId }
    })
    return updatedRows
  } catch (error) {
    return error
  }
}

module.exports = {
  getUserAddresses,
  createAddress,
  removeAddress
}
