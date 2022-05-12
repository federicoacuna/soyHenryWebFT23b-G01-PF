const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('review', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 5,
        isInt: true
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }
  })
}
