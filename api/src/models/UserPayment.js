const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('userPayment', {
    cardNumber: {
      type: DataTypes.BIGINT,
      allownull: false,
      unique: true
    },
    expirationDay: {
      type: DataTypes.DATEONLY,
      allownull: false,
      validate: {
        isDate: true
      }
    },
    provider: {
      type: DataTypes.STRING(20),
      allownull: false,
      validate: {
        isAlpha: true,
        notEmpty: true
      }
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
}
