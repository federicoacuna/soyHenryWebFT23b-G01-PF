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

async function updateUser (req) {
  const user = await getUserByEmail(req.user.email)
  user && await user.update(req.body)
  return user
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
