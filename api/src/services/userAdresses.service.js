const { userAdress } = require('../db')

async function getAllAdresses (userId) {
  return await userAdress.findByPk(userId)
}

async function createAdress (data) {
  const { postal_code, city, street_name, house_number, delivery_instructions, floor_apartment,  state } = data

  return await userAdress.findOrCreate({
    where: {
      postal_code,
      city,
      street_name,
      house_number,
      delivery_instructions,
      floor_apartment,
      state
    }
  })
}

async function removeAdress (adressId) {
  return await userAdress.destroy({
    where: { id: adressId }
  })
}

module.exports = {
  getAllAdresses,
  createAdress,
  removeAdress
}
