const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('branch', {
    state: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    streetName: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    houseNumber: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  })
}
