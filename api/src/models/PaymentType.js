const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('paymentType', {
    paymentName: {
      type: DataTypes.STRING(30),
      allownull: false
    }
  })
}
