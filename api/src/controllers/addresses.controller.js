const addressService = require('../services/userAddresses.service')
const usersService = require('../services/users.service.js')

async function create (req, res, next) {
  const user = await usersService.getUserByEmail(req.user.email)
  const newAddress = req.body
  newAddress.userId = user.id
  const requiredData = ['postalCode', 'state', 'city', 'streetName', 'houseNumber']
  let validationErrors = 'The following mandatory data is missing in your request: '
  const errorLength = validationErrors.length

  for (const column of requiredData) {
    newAddress[column] || (validationErrors += column + ' ')
  }

  if (validationErrors.length > errorLength) return res.status(400).json({ error: validationErrors })

  try {
    const wasCreated = await addressService.createAddress(newAddress)
    wasCreated ? res.send({ message: 'Address created correctly' }) : res.status(400).json({ error: 'Address was not created, it already exists' })
  } catch (error) {
    res.send(error)
  }
}

async function remove (req, res, next) {
  const { addressId } = req.params
  if (!addressId) {
    return res.status(400).json({ error: 'Must provide the address ID to be deleted' })
  }
  try {
    const wasDeleted = await addressService.removeAddress(addressId)
    wasDeleted ? res.json({ message: 'Address deleted correctly' }) : res.status(400).json({ error: 'Address could not be deleted' })
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  create,
  remove
}
