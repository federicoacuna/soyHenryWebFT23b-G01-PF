const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('order', {
    status: {
      type: DataTypes.STRING,
      defaultValue: 'CREATED'
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  })
}
