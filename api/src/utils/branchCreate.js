const { Branch } = require('../db')

const saveProducts = async () => {
  try {
    await Branch.create(
      {
        state: 'Corrientes',
        city: 'Corrientes',
        streetName: 'San Martin',
        houseNumber: '5499',
        countryId: 1

      })
    await Branch.create(
      {
        state: 'Perugorria',
        city: 'Cochinilla',
        streetName: 'Puerto Madero',
        houseNumber: '42069',
        countryId: 2

      })
    await Branch.create(
      {
        state: 'West Virginia',
        city: 'Snowshoe Village',
        streetName: 'Main St.',
        houseNumber: '42069',
        countryId: 5

      })
  } catch (err) {
    console.log(err)
  }
}

saveProducts()
  .catch(err => console.log(err))
