const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('branch', {
    state: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    streetName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    houseNumber: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  })
}
