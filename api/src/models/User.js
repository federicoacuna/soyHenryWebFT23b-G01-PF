const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('user', {
    username: {
      type: DataTypes.STRING(20),
      allownull: false,
      unique: true,
      validate: {
        notEmpty: true

      }
    },
    password: {
      type: DataTypes.STRING(30),
      allownull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    firstname: {
      type: DataTypes.STRING(12),
      allownull: false,
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
      type: DataTypes.BIGINT,
      allownull: false,
      validate: {
        isInt: true,
        inLongerThan20 (value) {
          if (value.toString().length > 20) { throw new Error('Cellphone must be shorter than 20 numbers') }
        }
      }
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allownull: false

    },
    email: {
      type: DataTypes.STRING(40),
      validate: {
        isEmail: true
      }

    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false

    }
  })
}

// is: (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
