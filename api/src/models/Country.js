const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('country', {
    countryName: {
      type: DataTypes.STRING(40),
      allownull: false
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true

    }
  })
}
