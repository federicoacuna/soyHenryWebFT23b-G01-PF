const { UserAddress } = require('../db')

const validAddress = {
  userId: '1',
  postalCode: '2900',
  countryId: 3,
  state: 'Buenos Aires',
  city: 'San Nicolas',
  streetName: 'Mitre',
  houseNumber: 666
}
const validAddress2 = {
  userId: '1',
  postalCode: '2900',
  countryId: 8,
  state: 'Buenos Aires',
  city: 'San Nicolas',
  streetName: 'Tucuman',
  houseNumber: 777
}
const validAddress3 = {
  userId: '2',
  postalCode: '2900',
  countryId: 3,
  state: 'Buenos Aires',
  city: 'San Nicolas',
  streetName: 'Cochabamba',
  houseNumber: 123
}

const saveUserAddresses = async () => {
  try {
    await UserAddress.create(validAddress)
    await UserAddress.create(validAddress2)
    await UserAddress.create(validAddress3)
  } catch (err) {
    console.log(err)
  }
}

saveUserAddresses()
  .catch(err => console.log(err))
