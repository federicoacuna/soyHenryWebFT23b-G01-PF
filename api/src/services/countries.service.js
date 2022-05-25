const { Country } = require('../db')

async function getCountries () {
  return await Country.findAll({
    attributes: ['id', 'countryName', 'enabled']
  })
}

async function createCountry (data) {
  let { countryName } = data
  countryName = countryName.toLowerCase().split(' ').map(n => { return n.charAt(0).toUpperCase() + n.slice(1) }).join(' ')
  const [, wasCreated] = await Country.findOrCreate({
    where: {
      countryName
    }
  })
  return wasCreated
}

async function updateCountry (data) {
  const { countryId, enabled } = data
  const wasCreated = await Country.update({ enabled }, { where: { id: countryId } })
  return wasCreated
}

async function removeCountry (countryId) {
  return await Country.destroy({ where: { id: countryId } })
}

module.exports = {
  getCountries,
  createCountry,
  updateCountry,
  removeCountry
}
