const services = require('../services/useradresses.service')

async function getById (req, res, next) {
  try {
    res.json(await services.getAllAdresses(req.param.userId))
  } catch (error) {
    console.log('error trying to execute getAllAdresses')
  }
}

async function create (req, res, next) {
  try {
    res.send({ message: 'Adress created correctly' }).json(await services.createAdress(req.body))
  } catch (error) {
    console.log('error trying to execute createAdress')
    res.send({ message: 'Adress was not created' })
  }
}

async function remove (req, res, next) {
  try {
    res.send({ message: 'Adress deleted correctly' }).json(await services.removeAdress(req.param.adressId))
  } catch (error) {
    console.log('error trying to execute removeAdress')
    res.send({ message: 'Adress was not deleted' })
  }
}

module.exports = {
  getById,
  create,
  remove
}
