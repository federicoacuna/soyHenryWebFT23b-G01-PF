const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('paymentType', {
    paymentName: {
      type: DataTypes.STRING(12),
      allownull: false
    }
  })
}
