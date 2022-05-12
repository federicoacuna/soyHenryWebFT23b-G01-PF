const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('payment_type', {
    paymentName: {
      type: DataTypes.STRING(12),
      allownull: false
    }
  },
  {
    underscored: true
  })
}
