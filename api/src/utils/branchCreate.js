const { Branch } = require('../db')

const saveProducts = async () => {
  try {
    await Branch.create(
      {
        coordinates: '1234',
        country: 'Argentina',
        state: 'Corrientes',
        city: 'Corrientes',
        street: 'San Martin',
        number: '5499'

      })
    await Branch.create(
      {
        coordinates: '123499',
        country: 'Colombia',
        state: 'Perugorria',
        city: 'Cochinilla',
        street: 'Puerto Madero',
        number: '42069'

      })
  } catch (err) {
    console.log(err)
  }
}

saveProducts()
  .catch(err => console.log(err))
