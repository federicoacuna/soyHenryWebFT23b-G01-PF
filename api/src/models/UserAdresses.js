const { DataTypes } = require('sequelize')

module.exports = sequelize => {
    sequelize.define('userAdresses',{
        postal_code:{//string
            type: DataTypes.STRING(20),
            allownull: false,
        },
        city:{//string
            type: DataTypes.STRING(20),
            allownull: false,
        },
        street_name:{//string
            type: DataTypes.STRING(30),
            allownull: false,
        },
        house_number:{//number
            type: DataTypes.INTEGER,
            allownull: false,
            validate:{
                isNumeric: true 
            }
        },
        delivery_instructions:{//text
            type: DataTypes.TEXT,       //podría ser tinytext, pero éste admite solo 255 caracteres
        },
        floor_apartment:{//string
            type:DataTypes.STRING(20),
        },
        state:{//campo
            type:DataTypes.STRING(30),
            allownull:false,
        }
    })
}
