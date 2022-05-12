const { userAddress } = require('../db')

async function getAllAddresses (userId) {
  return await userAddress.findAll({
    where: { user_id: userId }
  })
}

async function createAddress (data) {
  const { postalCode, city, streetName, houseNumber, deliveryInstructions, floorApartment, state } = data

  return await userAddress.findOrCreate({
    where: {
      postalCode,
      city,
      streetName,
      houseNumber,
      deliveryInstructions,
      floorApartment,
      state
    }
  })
}

async function removeAddress (addressId) {
  return await userAddress.destroy({
    where: { id: addressId }
  })
}

module.exports = {
  getAllAddresses,
  createAddress,
  removeAddress
}
