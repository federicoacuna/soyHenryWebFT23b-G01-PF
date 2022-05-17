const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('userAddress', {
    postalCode: {
      type: DataTypes.STRING(20),
      allownull: false
    },
    country: {
      type: DataTypes.STRING(15),
      allownull: false
    },
    state: {
      type: DataTypes.STRING(30),
      allownull: false
    },
    city: {
      type: DataTypes.STRING(20),
      allownull: false
    },
    streetName: {
      type: DataTypes.STRING(30),
      allownull: false
    },
    houseNumber: {
      type: DataTypes.INTEGER,
      allownull: false,
      validate: {
        isNumeric: true
      }
    },
    deliveryInstructions: {
      type: DataTypes.TEXT
    },
    floorApartment: {
      type: DataTypes.STRING(20)
    }
  })
}
