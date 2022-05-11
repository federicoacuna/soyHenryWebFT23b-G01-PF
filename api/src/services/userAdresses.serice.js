// VERIFICAR que el nombre del modelo Adresses coincida con el de la DB
const { Adresses } = require('../db')

async function getAllAdresses (useriD) {
  return await Adresses.findByPk(useriD)
}

async function createAdress (data) {
  // VERIFICAR que nombres de parámetros coincidan con los del modelo Adresses de la DB
  const { userId, postalCode, countryId, state, city, streetName, houseNumber, floorApartment, deliveryInstructions } = data

  return await Adresses.findOrCreate({
    where: {
      userId,
      postalCode,
      countryId,
      state,
      city,
      streetName,
      houseNumber,
      floorApartment,
      deliveryInstructions
    }
  })
}

async function removeAdress (adressId) {
  return await Adresses.destroy({
    where: { id: adressId }
  })
}

module.exports = {
  getAllAdresses,
  createAdress,
  removeAdress
}
