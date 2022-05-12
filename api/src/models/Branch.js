const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('branch', {
    coordinates: {
      type: DataTypes.STRING,
      unique: true
    },
    country: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    street: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    number: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  })
}
