const { UserAddress } = require('../db')

async function getUserAddresses (userId) {
  const userAddresses = await UserAddress.findAll({
    where: { userId }
  })

  return userAddresses
}

async function createAddress (newAddress) {
  newAddress.userId = parseInt(newAddress.userId)
  newAddress.houseNumber = parseInt(newAddress.houseNumber)
  const { userId, postalCode, state, city, streetName, houseNumber } = newAddress

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
}

async function removeAddress (addressId) {
  // VERIFICAR SI EN UPDATEDROWS ESTA EL VALOR CORRECTO
  const [updatedRows] = await UserAddress.update({
    deleted: true
  },
  {
    where: { id: addressId }
  })

  return updatedRows === 1
}

async function updateAddress (updatedAddress) {
  // STUB FUNCTION
}

module.exports = {
  getUserAddresses,
  createAddress,
  removeAddress,
  updateAddress
}
