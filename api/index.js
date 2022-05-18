//           ████████████████▄▄
//      ▄████████████████████████▄
//    ████████▓▓▓██████████████████▄
//   ████▀╢▒▒▒▒▒▒▒╢╢▀▓▓█████████████▌
//  ███▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒╢▓███████████⌐
// ██▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒╢▓█████████
// █▌╣▒▒▒▒▒▒▒▒▒▒▒▄▓▓╣▒▒▒▒▒▒▒▒▒╢▓███████µ
// █▓╣▒▒▒▒▒▒╢▓▓██▓╬▒╢╢▄▓╢▒▒▒▒▒▒▒▓▓███▓▓▓µ
// █▓╣╢╢╢╣╣╢▓▓▓▓▓▓█████▀▀▒▒░░░▒▒▒╫▓███▄▓▓
// ▐█▓▓▓▓▓▓▓╣▒╢▓▓█▓▓▓╢▒▒░░▒▒▒▒▒▒▒╢▓▓▓▓▓▓╣
//  ███████▓╣▒▒▒▒▒▒╢╣▒▒▒▒▒▒▒╢╣╣╢╣╣╢▓▓▓▓▒╣█
//  └█▓████▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒╢╢╢╣╣╢╢╣▒╢╢▓▓░▐██▄
//    ██▓▓▓▓╢▒▒▒▒▒╢╣╣╣▒▒▒╢╣╢╣╢╣╣╢▒▒▒▒╢▓▓████████▄,
//    ▐█▓╣▓╢▓╣▒▒@▄▄▓▓╣╣╣╣╢╢╣╣╣╢╣╣╣╢╣╣╣▓▓▓████▀▀▀▀╙⌠¬ ╙▐▀▀▀▄
//     █▓╣╢╢▓██████▀╢▒▒▒▒╢╢╢╢╣╣╣╢╣╢╫▓▓╣╣╢▓╬▒╢╬@░░░░░       █
//     ▀█▓▓▓▓▓██▓╢▒▒▒▒╢▓▓▓▓╢╢╢╣▓▓▓▓▓▓▓▓╣▒╢╣▒▓▓▓╢░░▒░       "▌
//      ▀██▓▓▓▓▓▓███████▀▓▓▓▓▓▓▓▓▓▓▓▓▓▓╣╣╢╢╣▓▓▓▓▓▒`       ░░▐µ
//        ▀██▓▓▓███▓████▓▓▓▓▓▓▓▓▓▓▓▓▓▓╣╣▒▒╢╢▒▐▓╜         ░░░░█⌐
//          ▀███▓█████▓╢╢╢╫▓▓▓▓█▓███▓▓╣╣╢▒╢╢╢╣░        ░░░░░░╙╨,
//            ▀▀████▓▓▓▓▓▓██████████▓▓╣╣╣╢╢Ñ░        ░░░░░░        ,
//                -╨▀██████████████▓▓▓▓▓▓╣░       ░░░░░░░           ╙─.
//                  ╔░▒▒╢▓▓████████▓▓▓▓▓╜░    .░░░░▒░░░                 ░░░╟▌
//                  ╫▒▒▒▒▒▓▓██████▓▓▓▓▓░░░░░░▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░@╜░▌
//                   ▒▒▒▒▒╫▓▓████████▀▒▒░▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░╓▒▒░░░░%▄
//                   ╠▒▒▒▒╢▒╢▓██████Ñ▒▒▒╢╢╢╢╢╢╣▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒╣▒▒▒▒▒▒▒▒▒▒▀▌
//                   ▓▒▒▒▒▒╣╣█▓▓▓▓▓╬╢╢╢▓╢▓▓▓▓╢▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▓▓╣▒▒▒▒▒▒▒▒▒╫▓╣▀
//                   ▓╢▒▒▒▒╢╢▓▓▓▓▓╣╣▓▓▓▓▓▓▓╢╣▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▓▓▓╢╢▒▒▒▒▒▒▒▒▒▒▒▒╢▓▓
//                   ▓╫╣╢╢╣╢╢▓▓▓▓▓▓▓▓███╢╢╣╣╣╢╣╣╢╣╣╣╣╣╢╢▓▓▓▓╣╢╣╣╢▒▒▒▒▒▒▒▒▒▒▒╢╢╢╢▓▓
//                  ─╝                                                     `╙╙╨╩╩╝═

const server = require('./src/app.js')
const { conn } = require('./src/db.js')
const port = process.env.PORT || 3001
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  require('./src/utils/productAndCategoryCreate.js')
  require('./src/utils/paymentTypeCreate')
  require('./src/utils/countryCreate')
  require('./src/utils/userRolesCreate.js')
  require('./src/utils/userCreate.js')
  require('./src/utils/branchCreate.js')
  require('./src/utils/userAddressesSeeder.js')
  // require('./src/utils/cartItemsCreate.js') // FIXME: descomentar cuando se haya arreglado el seeder
  // require('./src/utils/inventoryCreate.js') // FIXME: descomentar cuando se haya arreglado el seeder
  // require('./src/utils/paymentCreate.js') // FIXME: descomentar cuando se haya arreglado el seeder
  // require('./src/utils/orderCreate.js') // FIXME: descomentar cuando se haya arreglado el seeder
  // require('./src/utils/orderItemCreate') // FIXME: descomentar cuando se haya arreglado el seeder

  server.listen(port, () => {
    console.log('Backend listening at 3001') // eslint-disable-line no-console
  })
})
