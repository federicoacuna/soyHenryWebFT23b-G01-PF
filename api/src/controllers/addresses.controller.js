const addressService = require('../services/userAddresses.service')

async function getUserAddresses (req, res, next) {
  const { userId } = req.params

  if (!userId) {
    return res.status(400).json({ error: 'Must provide user ID' })
  }
  if (isNaN(parseInt(userId))) {
    return res.status(400).json({ error: 'User ID can only be a integer' })
  }
  try {
    const addresses = await addressService.getUserAddresses(userId)

    addresses.length ? res.json(addresses) : res.status(404).json({ error: 'No addresses where found' })
  } catch (error) {
    res.json(error)
  }
}

async function create (req, res, next) {
  const newAddress = req.body
  const requiredData = ['userId', 'postalCode', 'state', 'city', 'streetName', 'houseNumber']
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
  getUserAddresses,
  create,
  remove
}
