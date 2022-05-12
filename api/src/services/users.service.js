// VERIFICAR que el nombre del modelo Users coincida con el de la DB
const { Users } = require('../db')

async function getUserByEmail (userEmail) {
  return await Users.findOne({
    where: { mail: userEmail }
  })
}

async function createUser (data) {
  // VERIFICAR que nombres de parámetros coincidan con los del modelo Users de la DB
  const { username, password, firstname, lastname, phone, birthdate, email } = data

  return await Users.findOrCreate({
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

  return await Users.update(firstArg, { where: { id: userId } })
}

async function removeUser (userId) {
  return await Users.destroy({
    where: { id: userId }
  })
}

module.exports = {
  getUserByEmail,
  createUser,
  updateUser,
  removeUser
}
