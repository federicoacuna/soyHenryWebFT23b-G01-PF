const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('cart_item', {
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    }
  })
}
