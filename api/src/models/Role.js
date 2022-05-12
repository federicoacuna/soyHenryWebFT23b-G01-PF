const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('role', {
    name: {
      type: DataTypes.STRING(18),
      allownull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isAlpha: true
      }
    }
  })
}
