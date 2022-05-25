const Countries = require('../services/countries.service')

const get = async (req, res) => {
  try {
    const retrievedCountries = await Countries.getCountries()
    retrievedCountries ? res.status(200).json(retrievedCountries) : res.status(400).json({ error: 'No country was found' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const create = async (req, res) => {
  const { countryName } = req.body

  if (!countryName) {
    res.status(400).json({ error: 'Must provide a country name' })
  }
  try {
    await Countries.createCountry(req.body)
      ? res.status(200).json({ message: 'The country was succesfully created' })
      : res.status(400).json({ error: 'The country already exists' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const update = (req, res) => {
    const { countryId, enabled } = req.body //eslint-disable-line

  if (!parseInt(countryId)) {
    res.status(400).json({ error: 'Country Id must be provided' })
  }
  try {
    req.body.countryId = parseInt(countryId)
    const wasUpdated = Countries.updateCountry(req.body)
    wasUpdated > 0
      ? res.status(200).json({ message: 'Country status was succesfully updated' })
      : res.status(400).json({ error: 'Country status could not be updated' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const remove = (req, res) => {
  const { countryId } = req.params

  if (!parseInt(countryId)) {
    res.status(400).json({ error: 'Country Id must be provided' })
  }
  try {
    req.params.countryId = parseInt(countryId)
    const wasRemoved = Countries.removeCountry(req.params.countryId)
    wasRemoved > 0
      ? res.status(200).json({ message: 'Country was succesfully deleted' })
      : res.status(400).json({ error: 'Country could not be deleted' })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  get,
  create,
  update,
  remove
}
