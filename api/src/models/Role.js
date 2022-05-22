const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('role', {
    name: {
      type: DataTypes.STRING(30),
      allownull: false,
      unique: true
    }
  })
}
