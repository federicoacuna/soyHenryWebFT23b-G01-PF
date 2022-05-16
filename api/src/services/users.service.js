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
  // VERIFICAR que los parámetros a modificar sean los que se quieren modificar
  const { userId, username, password, phone, email } = data

  const firstArg = {}

  username && (firstArg.username = username)
  password && (firstArg.password = password)
  phone && (firstArg.phone = phone)
  email && (firstArg.email = email)

  return await User.update(firstArg, { where: { id: userId } })
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
