const { User, UserPayment, UserAddress } = require('../db')

async function getUserByEmail (userEmail) {
  return await User.findOne({
    where: { email: userEmail }
  })
}

async function getById (userId) {
  const user = await User.findOne({
    where: { id: userId },
    include: [{ model: UserAddress, attributes: ['id', 'postalCode', 'city', 'streetName', 'houseNumber', 'state'] },
      { model: UserPayment, attributes: ['id', 'cardNumber', 'provider'] }]
  })
  return user
}

async function createUser (email) {
  const [user] = await User.findOrCreate({
    where: {
      email
    }
  })

  return user
}

async function updateUser (data) {
  const { id, firstname, lastname, phone, birthdate } = data
  const firstArg = {}

  firstname && (firstArg.firstname = firstname)
  lastname && (firstArg.lastname = lastname)
  phone && (firstArg.phone = phone)
  birthdate && (firstArg.birthdate = birthdate)

  return await User.update(firstArg, { where: { id } })
}

async function removeUser (userId) {
  return await User.update({ deleted: true }, { where: { id: userId } })
}

module.exports = {
  getUserByEmail,
  getById,
  createUser,
  updateUser,
  removeUser
}
