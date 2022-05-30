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

async function getUsers (userId) {
  const user = await User.findAll({
    include: [{ model: UserAddress, attributes: ['id', 'postalCode', 'city', 'streetName', 'houseNumber', 'state'] },
      { model: UserPayment, attributes: ['id', 'cardNumber', 'provider'] }]
  })
  const users = user.filter(elem => elem.id !== userId)

  return users
}

async function createUser (email) {
  const [user, wasCreated] = await User.findOrCreate({
    where: {
      email
    }
  })
  if (wasCreated) {
    await UserPayment.create({
      userId: user.id,
      paymentTypeId: 3,
      provider: 'Mercado Pago'
    })
  }
  return user
}

async function updateUser (req, id) {
  if (!id) {
    const { firstname, lastname, phone, birthdate } = req.body
    const user = await getUserByEmail(req.user.email)
    user && await user.update({ firstname, lastname, phone, birthdate })
    return user
  } else {
    const { isAdmin, enabled, deleted } = req.body
    const user = await getById(id)
    user && await user.update({ isAdmin, enabled, deleted }, { where: { id: user.id } })
    return user
  }
}

async function removeUser (userId) {
  return await User.update({ deleted: true }, { where: { id: userId } })
}

module.exports = {
  getUserByEmail,
  getById,
  createUser,
  updateUser,
  removeUser,
  getUsers
}
