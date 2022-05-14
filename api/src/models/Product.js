const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.1
      }
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  })
}
