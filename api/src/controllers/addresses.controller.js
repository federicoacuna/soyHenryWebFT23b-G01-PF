const addressService = require('../services/userAddresses.service')
const usersService = require('../services/users.service.js')

async function get (req, res) {
  const user = await usersService.getUserByEmail(req.user.email)
  const allUserAddresses = await addressService.getUserAddresses(user.id)

  allUserAddresses
    ? res.status(200).json({ data: allUserAddresses })
    : res.status(404).json({ error: 'No se encontraron direcciones' })
}

async function create (req, res) {
  const user = await usersService.getUserByEmail(req.user.email)
  const newAddress = req.body
  newAddress.userId = user.id
  const requiredData = ['postalCode', 'state', 'city', 'streetName', 'houseNumber', 'countryId']
  let validationErrors = 'The following mandatory data is missing in your request: '
  const errorLength = validationErrors.length
  for (const column of requiredData) {
    newAddress[column] || (validationErrors += column + ' ')
  }
  if (validationErrors.length > errorLength) return res.status(400).json({ error: validationErrors })

  try {
    const wasCreated = await addressService.createAddress(newAddress)
    const allUserAddresses = await addressService.getUserAddresses(user.id)
    wasCreated
      ? res.status(200).json({
        data: allUserAddresses,
        message: 'Se guardo la nueva dirección con éxito'
      })
      : res.status(400).json({
        data: allUserAddresses,
        error: 'Ya existe la direccion ingresada'
      })
  } catch (error) {
    res.status(400).json(error)
  }
}

async function remove (req, res) {
  const { addressId } = req.params
  if (!addressId) {
    return res.status(400).json({ error: 'Must provide the address ID to be deleted' })
  }
  if (isNaN(parseInt(addressId))) {
    return res.status(400).json({ error: 'Invalid address ID' })
  }

  try {
    const user = await usersService.getUserByEmail(req.user.email)
    const wasDeleted = await addressService.removeAddress(addressId)
    const allUserAddresses = await addressService.getUserAddresses(user.id)
    wasDeleted > 0
      ? res.status(200).json({
        data: allUserAddresses,
        message: 'Se elimino la dirección con éxito'
      })
      : res.status(400).json({
        data: allUserAddresses,
        error: 'No se pudo eliminar la direccion'
      })
  } catch (error) {
    res.status(400).json(error)
  }
}

async function update (req, res) {
  const { addressId } = req.params
  if (!addressId) {
    return res.status(400).json({ error: 'Must provide the address ID to be updated' })
  }
  if (isNaN(parseInt(addressId))) {
    return res.status(400).json({ error: 'Invalid address ID' })
  }
  const updatedAddress = req.body
  updatedAddress.id = addressId
  try {
    const user = await usersService.getUserByEmail(req.user.email)
    const wasUpdated = await addressService.updateAddress(updatedAddress)
    const allUserAddresses = await addressService.getUserAddresses(user.id)
    wasUpdated
      ? res.status(200).json({
        data: allUserAddresses,
        message: 'Se actualizó la dirección con éxito'
      })
      : res.status(400).json({
        data: allUserAddresses,
        error: 'No se pudo actualizar la dirección'
      })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  create,
  get,
  remove,
  update
}
