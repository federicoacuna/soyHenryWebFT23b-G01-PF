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
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0.1
      }
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      get () {
        const rawValue = this.getDataValue('image')
        if (!rawValue) return
        return rawValue.map(img => img.split('|')[0])
      }
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    }
  })
}
