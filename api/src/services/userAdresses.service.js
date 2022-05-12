const { userAdresses } = require('../db')

async function getAllAdresses (useriD) {
  return await userAdresses.findByPk(useriD)
}

async function createAdress (data) {
  const { postal_code, city, street_name, house_number, delivery_instructions, floor_apartment,  state } = data

  return await userAdresses.findOrCreate({
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
  return await userAdresses.destroy({
    where: { id: adressId }
  })
}

module.exports = {
  getAllAdresses,
  createAdress,
  removeAdress
}
