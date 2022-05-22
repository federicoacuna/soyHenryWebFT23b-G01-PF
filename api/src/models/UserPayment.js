const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('userPayment', {
    cardNumber: {
      type: DataTypes.BIGINT,
      allownull: true
    },
    expirationDay: {
      type: DataTypes.DATEONLY,
      allownull: true
    },
    provider: {
      type: DataTypes.STRING(20),
      allownull: false,
      validate: {
        notEmpty: true
      }
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
}
