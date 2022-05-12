const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('inventory', {
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        min: 0
      }
    }
  })
}
