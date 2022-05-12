const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('order', {
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  })
}
