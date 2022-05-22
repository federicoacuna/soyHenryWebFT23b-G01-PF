const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('review', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  })
}
