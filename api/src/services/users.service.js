const { User } = require('../db')

async function getUserByEmail (userEmail) {
  return await User.findOne({
    where: { email: userEmail }
  })
}

async function getById(userId){
  let user = await User.findOne({
    where: {id: userId}
  })
  return user
}

async function createUser (data) {
  const { username, password, firstname, lastname, phone, birthdate, email } = data

  return await User.findOrCreate({
    where: {
      username,
      password,
      firstname,
      lastname,
      phone,
      birthdate,
      email
    }
  })
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
  return await User.update({deleted: true}, { where: { id: userId } })
}

module.exports = {
  getUserByEmail,
  createUser,
  updateUser,
  removeUser
}
