const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('order_item', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  })
}
