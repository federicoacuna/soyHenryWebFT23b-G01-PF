const { DataTypes } = require('sequelize')

module.exports = sequelize => {
    sequelize.define('userPayment', {
        card_number: {
            type: DataTypes.BIGINT,
            allownull: false,
            unique: true,
            validate: {
                isCreditCard: true  
            }
        },
        expiration_day: {
            type: DataTypes.DATEONLY,
            allownull: false,
            validate:{
                isDate: true,
            }
        },
        provider: {
            type: DataTypes.STRING(20),
            allownull: false,
            validate: {
                isAlpha: true,
                notEmpty: true
            }
        }
    })
}