const services = require('../services/useradresses.service')

async function getById (req, res, next) {
  const { userId } = req.params;
  
  if(!userID) {
    res.status(400).json({ error: 'No addresses where found' })
  }
    
  try {
    const addresses = await services.getAllAdresses(userId)
    addresses ? res.json(addresses) : res.status(404).json({ error: 'No addresses where found' })
  } catch (error) {
    res.json(error)
  }
}

async function create (req, res, next) {
  try {
    const wasCreated = await services.createAdress(req.body)
    wasCreated ? res.send({ message: 'Address created correctly' }) : res.status(400).json({ error: 'Address was not created' })
  } catch (error) {
    res.send(error)
  }
}

async function remove (req, res, next) {
  try {
    const wasDeleted = await services.removeAdress(req.param.adressId)
    wasDeleted ? res.json({ message: 'Address deleted correctly' }) : res.status(400).json({ error: 'Address could not be deleted' })
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  getById,
  create,
  remove
}
