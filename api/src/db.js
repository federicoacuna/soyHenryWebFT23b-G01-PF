require('dotenv').config()
const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')
const { resolveSoa } = require('dns')
const {
  DB_USER, DB_PASSWORD, DB_HOST
} = process.env

const DB_URL = process.env.DATABASE_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:3000/ecommerce`

const sequelize = new Sequelize(DB_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false // lets Sequelize know we can use pg-native for ~30% more speed
})

const basename = path.basename(__filename)
const modelDefiners = []

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)))
  })

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize))
// Capitalizamos los nombres de los modelos ie: product => Product
const entries = Object.entries(sequelize.models)
const capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]])
sequelize.models = Object.fromEntries(capsEntries)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Category, Product, Role, User, UserAddress, UserPayment, Branch, CartItem, Inventory, Order, OrderItem, PaymentType, WishList, Review } = sequelize.models

// Aca vendrian las relaciones
Category.hasMany(Product, { foreingKey: { allowNull: false } })
Product.belongsTo(Category)

User.hasMany(UserAddress)
UserAddress.belongsTo(User)

User.hasMany(UserPayment, { foreingKey: { allowNull: false } })
UserPayment.belongsTo(User)

PaymentType.hasMany(UserPayment)
UserPayment.belongsTo(PaymentType)

Role.hasMany(User)
User.belongsTo(Role)

User.hasMany(Review)
Review.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(CartItem)
CartItem.belongsTo(User)

Product.hasMany(CartItem)
CartItem.belongsTo(Product)

Product.belongsToMany(Inventory, { through: 'product_inventory' })
Inventory.belongsToMany(Product, { through: 'product_inventory' })

Branch.hasOne(Inventory)
Inventory.belongsTo(Branch)

User.hasMany(Order)
Order.belongsTo(User)

UserPayment.hasOne(Order)
Order.belongsTo(UserPayment)

UserAddress.hasOne(Order)
Order.belongsTo(UserAddress)

Branch.hasOne(Order)
Order.belongsTo(Branch)

OrderItem.hasMany(Order)
Order.belongsTo(OrderItem)

Product.hasMany(OrderItem)
OrderItem.belongsTo(Product)

User.hasOne(WishList)
WishList.belongsTo(User)

Product.hasOne(WishList)
WishList.belongsTo(Product)

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize // para importart la conexión { conn } = require('./db.js');
}
