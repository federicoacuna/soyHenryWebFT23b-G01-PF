const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('paymentType', {
    paymentName: {
      type: DataTypes.STRING(15),
      allownull: false
    }
  })
}
