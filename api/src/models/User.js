const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('user', {
    email: {
      type: DataTypes.STRING(40),
      unique: true,
      validate: {
        isEmail: true

      }
    },
    firstname: {
      type: DataTypes.STRING(12),
      allownull: true,
      validate: {
        isAlpha: true,
        notEmpty: true
      }
    },
    lastname: {
      type: DataTypes.STRING(15),
      allownull: false,
      validate: {
        isAlpha: true,
        notEmpty: true
      }
    },
    phone: {
      type: DataTypes.STRING(30),
      allownull: true,
      validate: {
        isAlphanumeric: true
      }
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allownull: true

    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false

    }
  })
}
