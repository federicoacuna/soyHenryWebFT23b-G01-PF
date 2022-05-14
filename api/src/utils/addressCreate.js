const { UserAddress } = require('../db.js')

const saveProducts = async () => {
  try {
    await UserAddress.create({
      postalCode: '3100',
      city: 'Paraná',
      streetName: 'Miguel David',
      houseNumber: '2240',
      deliveryInstructions: 'Casa ubicada a pocos metros sobre la esquina. Casa naranja',
      floorApartment: '3',
      state: 'Entre Ríos',
      userId: 1
    })
    await UserAddress.create({
      postalCode: '3000',
      city: 'Santa Fe',
      streetName: 'Avenida Lopez y Planes',
      houseNumber: '4032',
      deliveryInstructions: 'Casa ubicada en frente a la entrada hacia pasaje quiroga, árbol en la entrada',
      floorApartment: '',
      state: 'Santa Fe',
      userId: 2
    })
  } catch (error) {
    console.log(error)
  }
}

saveProducts()
  .catch(error => console.log(error))
