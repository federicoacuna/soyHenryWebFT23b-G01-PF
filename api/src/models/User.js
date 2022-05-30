const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('user', {
    email: {
      type: DataTypes.STRING(60),
      unique: true,
      validate: {
        isEmail: true
      }
    },
    firstname: {
      type: DataTypes.STRING(40),
      allownull: true
    },
    lastname: {
      type: DataTypes.STRING(40),
      allownull: false
    },
    phone: {
      type: DataTypes.STRING(40),
      allownull: true
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allownull: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
}
