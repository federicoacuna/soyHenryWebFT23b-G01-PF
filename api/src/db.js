require('dotenv').config()
const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')
const {
  DB_USER, DB_PASSWORD, DB_HOST
} = process.env

const DB_URL = process.env.DATABASE_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/ecommerce`

const sequelize = new Sequelize(DB_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false // lets Sequelize know we can use pg-native for ~30% more speed
})

const basename = path.basename(__filename)
const modelDefiners = []

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)))
  })

modelDefiners.forEach(model => model(sequelize))
const entries = Object.entries(sequelize.models)
const capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]])
sequelize.models = Object.fromEntries(capsEntries)

const { Category, Brand, Product, Role, User, UserAddress, UserPayment, Branch, Country, CartItem, Inventory, Order, OrderItem, PaymentType, Review } = sequelize.models//eslint-disable-line

// Aca vendrian las relaciones
Category.hasMany(Product, { foreignKey: { allowNull: false } })
Product.belongsTo(Category)

Brand.hasMany(Product, { foreignKey: { allowNull: false } })
Product.belongsTo(Brand)

User.hasMany(UserAddress)
UserAddress.belongsTo(User)

User.hasMany(UserPayment, { foreignKey: { allowNull: false } })
UserPayment.belongsTo(User)

PaymentType.hasMany(UserPayment)
UserPayment.belongsTo(PaymentType)

User.belongsToMany(Product, { through: 'review' })
Product.belongsToMany(User, { through: 'review' })

User.belongsToMany(Product, { through: 'cartItem' })
Product.belongsToMany(User, { through: 'cartItem' })

Product.belongsToMany(Branch, { as: 'Stock', through: 'inventory' })
Branch.belongsToMany(Product, { as: 'Stock', through: 'inventory' })

User.hasMany(Order, { foreignKey: { allowNull: false } })
Order.belongsTo(User)

UserPayment.hasMany(Order, { foreignKey: { allowNull: false } })
Order.belongsTo(UserPayment)

UserAddress.hasMany(Order)
Order.belongsTo(UserAddress)

Country.hasMany(UserAddress)
UserAddress.belongsTo(Country)

Country.hasMany(Branch)
Branch.belongsTo(Country)

Branch.hasMany(Order)
Order.belongsTo(Branch)

Product.belongsToMany(Order, { through: 'orderItem' })
Order.belongsToMany(Product, { through: 'orderItem' })

User.belongsToMany(Product, { through: 'wishList' })
Product.belongsToMany(User, { through: 'wishList' })

module.exports = {
  ...sequelize.models,
  conn: sequelize
}
