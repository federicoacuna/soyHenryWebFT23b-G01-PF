const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('review', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
        isInt: true
      }
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  })
}
