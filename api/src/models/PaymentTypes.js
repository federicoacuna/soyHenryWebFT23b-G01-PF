module.exports = sequelize => {
    sequelize.define('paymentType', {
        payment_name: {
            type: DataTypes.STRING(12),
            allownull: false,
        }
    })
}