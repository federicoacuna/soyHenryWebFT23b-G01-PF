const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('cartItem', {
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    }
  })
}
