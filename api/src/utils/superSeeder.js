const {
  Category,
  Brand,
  Product,
  Country,
  Branch,
  PaymentType,
  User,
  CartItem,
  UserAddress,
  UserPayment,
  Order,
  OrderItem,
  WishList,
  Review
} = require('../db')
const { faker } = require('@faker-js/faker')

// Categorías
const categories = [
  { name: 'Portátiles' }, // 1
  { name: 'Mouses' }, // 2
  { name: 'Teclados' }, // 3
  { name: 'Monitores' }, // 4
  { name: 'Headsets' }, // 5
  { name: 'Webcams' }, // 6
  { name: 'Tablets' }, // 7
  { name: 'Smartphones' }, // 8
  { name: 'Consolas' } // 9
]

// Marcas
const brands = [
  { name: 'Dell' }, // 1
  { name: 'Asus' }, // 2
  { name: 'Logitech' }, // 3
  { name: 'Redragon' }, // 4
  { name: 'Nisuta' }, // 5
  { name: 'Samsung' }, // 6
  { name: 'iQual' }, // 7
  { name: 'HyperX' }, // 8
  { name: 'Xiaomi' }, // 9
  { name: 'Sinovision' }, // 10
  { name: 'Gadnic' }, // 11
  { name: 'XPLODE' }, // 12
  { name: 'T-Go' }, // 13
  { name: 'X-View' }, // 14
  { name: 'Apple' }, // 15
  { name: 'Sony' }, // 16
  { name: 'Microsoft' }, // 17
  { name: 'Nintendo' } // 18
]

// Portátiles
const laptops = [
  {
    name: 'Notebook Dell Inspiron 3505 gris 15.6", AMD Ryzen 5 3450U 16GB de RAM 1TB HDD 256GB SSD, AMD Radeon RX Vega 8 60 Hz 1366x768px Windows 10 Home',
    description: faker.lorem.paragraph(),
    model: '3505',
    price: '134.999',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_921052-MLA47215256520_082021-F.webp'],
    categoryId: 1,
    brandId: 1
  },
  {
    name: 'Notebook Dell 3501 I3 11° 8gb 240gb Ssd 15.6 Win10 Gamer',
    description: faker.lorem.paragraph(),
    model: '3501',
    price: '87.999',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_901899-MLA46566949612_062021-F.webp'],
    categoryId: 1,
    brandId: 1
  },
  {
    name: 'Notebook Asus Intel Core I7 20gb 960gb Ssd 15,6 Gamer S/int',
    description: faker.lorem.paragraph(),
    model: 'X515EA',
    price: '229.999',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_618078-MLA43804510167_102020-F.webp'],
    categoryId: 1,
    brandId: 2
  },
  {
    name: 'Notebook Dell Vostro 3405 Amd Ryzen 5 8gb 256gb Ssd Gamer',
    description: faker.lorem.paragraph(),
    model: '3405',
    price: '99.999',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_769573-MLA46836968168_072021-F.webp'],
    categoryId: 1,
    brandId: 1
  },
  {
    name: 'Notebook Dell 3501 Intel Core I3 15.6 Hd 8gb 240gb Ssd Gamer',
    description: faker.lorem.paragraph(),
    model: '3405',
    price: '82.999',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_704142-MLA45754713760_042021-F.webp'],
    categoryId: 1,
    brandId: 1
  }
]

// Mouses
const mouses = [
  {
    name: 'Mouse de juego Logitech G Series Hero 16K G502 negro',
    description: faker.lorem.paragraph(),
    model: 'G502',
    price: '6.607',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_966913-MLA32149634914_092019-F.webp'],
    categoryId: 2,
    brandId: 3
  },
  {
    name: 'Mouse de juego Logitech G Series Lightsync G203 lila',
    description: faker.lorem.paragraph(),
    model: 'G203',
    price: '2.800',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_746987-MLA45385615382_032021-F.webp'],
    categoryId: 2,
    brandId: 3
  },
  {
    name: 'Mouse de juego Redragon Centrophorus2 M601-RGB black',
    description: faker.lorem.paragraph(),
    model: 'M601-RGB',
    price: '1.769',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_976958-MLA46624202487_072021-F.webp'],
    categoryId: 2,
    brandId: 4
  },
  {
    name: 'Mouse de juego inalámbrico recargable Logitech G Series Lightspeed G502 negro',
    description: faker.lorem.paragraph(),
    model: 'G502',
    price: '11.327',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_943772-MLA40076329951_122019-F.webp'],
    categoryId: 2,
    brandId: 3
  },
  {
    name: 'Mouse de juego Redragon Griffin M607 blanco',
    description: faker.lorem.paragraph(),
    model: 'M607',
    price: '2.099',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_999434-MLA43532397665_092020-F.webp'],
    categoryId: 2,
    brandId: 4
  }
]

// Teclados
const keyboards = [
  {
    name: 'Teclado gamer Redragon Kumara K552 QWERTY Outemu Red español latinoamérica color blanco con luz RGB',
    description: faker.lorem.paragraph(),
    model: 'K552W',
    price: '6.799',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_668104-MLA44207269301_112020-F.webp'],
    categoryId: 3,
    brandId: 4
  },
  {
    name: 'Teclado gamer Redragon Kumara K552 QWERTY Outemu Blue español latinoamérica color negro con luz RGB',
    description: faker.lorem.paragraph(),
    model: 'K552',
    price: '7.073',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_654842-MLA32722683116_102019-F.webp'],
    categoryId: 3,
    brandId: 4
  },
  {
    name: 'Teclado gamer Redragon Dragonborn K630 QWERTY Redragon Brown inglés US color negro con luz RGB',
    description: faker.lorem.paragraph(),
    model: 'K630',
    price: '5.799',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_745312-MLA46504064560_062021-F.webp'],
    categoryId: 3,
    brandId: 4
  },
  {
    name: 'Teclado gamer Redragon Shiva K512 RGB QWERTY español latinoamérica color negro con luz RGB',
    description: faker.lorem.paragraph(),
    model: 'K512 RGB',
    price: '3.999',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_836666-MLA47205974385_082021-F.webp'],
    categoryId: 3,
    brandId: 4
  },
  {
    name: 'Teclado gamer Nisuta NSKBGZ61 QWERTY Outemu Blue español España color negro con luz RGB',
    description: faker.lorem.paragraph(),
    model: 'NSKBGZ61',
    price: '6.399',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_777481-MLA42140820983_062020-F.webp'],
    categoryId: 3,
    brandId: 5
  }
]

// Monitores
const monitors = [
  {
    name: 'Monitor gamer curvo Samsung F390 Series C24F390FH led 24 " black high glossy 100V/240V',
    description: faker.lorem.paragraph(),
    model: 'C24F390FH',
    price: '34.999',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_886158-MLA46737528644_072021-F.webp'],
    categoryId: 4,
    brandId: 6
  },
  {
    name: 'Monitor gamer iQual iQ24H led 23.6 " negro 100V/240V',
    description: faker.lorem.paragraph(),
    model: 'iQ24H',
    price: '27.999',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_700635-MLA48049744185_102021-F.webp'],
    categoryId: 4,
    brandId: 7
  },
  {
    name: 'Monitor gamer Samsung F22T35 led 22 " dark blue gray 100V/240V',
    description: faker.lorem.paragraph(),
    model: 'F22T35',
    price: '36.999',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_796587-MLA46165231779_052021-F.webp'],
    categoryId: 4,
    brandId: 6
  },
  {
    name: 'Monitor gamer curvo Samsung F390 Series C27F390FH led 27 " negro 100V/240V',
    description: faker.lorem.paragraph(),
    model: 'C27F390FH',
    price: '44.819',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_657393-MLA32045104982_092019-F.webp'],
    categoryId: 4,
    brandId: 6
  },
  {
    name: 'Monitor gamer Samsung Odyssey G3 F24G35T LCD 24 " negro 100V/240V',
    description: faker.lorem.paragraph(),
    model: 'F24G35T',
    price: '46.490',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_926028-MLA48705312123_122021-F.webp'],
    categoryId: 4,
    brandId: 6
  }
]

// Headsets
const headsets = [
  {
    name: 'Auriculares Logitech H390 negro',
    description: faker.lorem.paragraph(),
    model: 'H390',
    price: '4.599',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_878789-MLA40161268975_122019-F.webp'],
    categoryId: 5,
    brandId: 3
  },
  {
    name: 'Auriculares inalámbricos Logitech Zone Wireless negro',
    description: faker.lorem.paragraph(),
    model: 'Zone Wireless',
    price: '21.781',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_670862-MLA44170027077_112020-F.webp'],
    categoryId: 5,
    brandId: 3
  },
  {
    name: 'Auriculares gamer inalámbricos HyperX Cloud Stinger Core Wireless + 7.1 negro',
    description: faker.lorem.paragraph(),
    model: 'HHSS1C-BA',
    price: '11.727',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_604648-MLA46478026978_062021-F.webp'],
    categoryId: 5,
    brandId: 8
  },
  {
    name: 'Auriculares gamer HyperX Cloud Stinger S negro',
    description: faker.lorem.paragraph(),
    model: 'HHSS1S-AA-BK',
    price: '9.099',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_726736-MLA47216608971_082021-F.webp'],
    categoryId: 5,
    brandId: 8
  },
  {
    name: 'Auriculares gamer inalámbricos HyperX Cloud Stinger Core blanco',
    description: faker.lorem.paragraph(),
    model: 'HHSS1C-KB',
    price: '10.699',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_699401-MLA48698142834_122021-F.webp'],
    categoryId: 5,
    brandId: 8
  }
]

// Webcams
const webcams = [
  {
    name: 'Cámara web Logitech C505e HD 30FPS color negro',
    description: faker.lorem.paragraph(),
    model: 'C505e',
    price: '4.995',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_789405-MLA49253755126_032022-F.webp'],
    categoryId: 6,
    brandId: 3
  },
  {
    name: 'Cámara web Logitech C922 Full HD 30FPS color negro',
    description: faker.lorem.paragraph(),
    model: 'V-U0028',
    price: '13.799',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_904570-MLA49170407523_022022-F.webp'],
    categoryId: 6,
    brandId: 3
  },
  {
    name: 'Cámara web Logitech C270 HD 30FPS color negro',
    description: faker.lorem.paragraph(),
    model: 'C270',
    price: '3.999',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_613460-MLA49274276309_032022-F.webp'],
    categoryId: 6,
    brandId: 3
  },
  {
    name: 'Cámara web Xiaomi Imilab Full HD 30FPS color negro',
    description: faker.lorem.paragraph(),
    model: 'CMSXJ22A',
    price: '4.183',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_707673-MLA49275394168_032022-F.webp'],
    categoryId: 6,
    brandId: 9
  },
  {
    name: 'Webcam Cámara Web Full Hd 1080p Con Micrófono Streaming Zoom',
    description: faker.lorem.paragraph(),
    model: 'SN-U3',
    price: '2.954',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_818027-MLA49472624900_032022-F.webp'],
    categoryId: 6,
    brandId: 10
  }
]

// Tablets
const tablets = [
  {
    name: 'Tablet con funda Gadnic Taurus Phone TAB0024C 10.1" con red móvil 32GB blanca y 2GB de memoria RAM',
    description: faker.lorem.paragraph(),
    model: 'TAB0024C',
    price: '25.000',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_924623-MLA48689881984_122021-F.webp'],
    categoryId: 7,
    brandId: 11
  },
  {
    name: 'Tablet 10 Pulgadas Chip Celular 4gb Ram 64 Gb Gamer Xplode',
    description: faker.lorem.paragraph(),
    model: 'Tablet XP-2',
    price: '32.300',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_880854-MLA48824205374_012022-F.webp'],
    categoryId: 7,
    brandId: 12
  },
  {
    name: 'Tablet con funda T-Go TABI Argos EUTB-758 7" 32GB verde y 2GB de memoria RAM',
    description: faker.lorem.paragraph(),
    model: 'EUTB-758',
    price: '16.290',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_631286-MLA48243843548_112021-F.webp'],
    categoryId: 7,
    brandId: 13
  },
  {
    name: 'Tablet Gamer Kids Niños 2gb De Memoria Ram + Funda Gratis',
    description: faker.lorem.paragraph(),
    model: 'EUTB-758',
    price: '16.990',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_764406-MLA49327328089_032022-F.webp'],
    categoryId: 7,
    brandId: 13
  },
  {
    name: 'Tablet Gamer 7 Pulgadas 64gb 4gb Ram Android 11 Panel Ips',
    description: faker.lorem.paragraph(),
    model: 'Q7',
    price: '32.300',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_641983-MLA49937795772_052022-F.webp'],
    categoryId: 7,
    brandId: 14
  }
]

// Smartphones
const smartphones = [
  {
    name: 'Xiaomi Redmi Note 10 Pro (Global) Dual SIM 128 GB gris ónix 6 GB RAM',
    description: faker.lorem.paragraph(),
    model: 'Note 10 Pro (Global)',
    price: '77.999',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_815921-MLA46490094279_062021-F.webp'],
    categoryId: 8,
    brandId: 9
  },
  {
    name: 'Samsung Galaxy A52 128 GB awesome black 6 GB RAM',
    description: faker.lorem.paragraph(),
    model: 'A52',
    price: '73.999',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_927874-MLA45401334658_032021-F.webp'],
    categoryId: 8,
    brandId: 6
  },
  {
    name: 'Samsung Galaxy S22 Ultra 12gb 256gb Phantom White',
    description: faker.lorem.paragraph(),
    model: 'S22 Ultra Dual SIM (Snapdragon)',
    price: '247.999',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_834464-MLA49303777747_032022-F.webp'],
    categoryId: 8,
    brandId: 6
  },
  {
    name: 'Apple iPhone 12 (128 GB) - Azul',
    description: faker.lorem.paragraph(),
    model: 'iPhone 12',
    price: '215.258',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_839818-MLA45719894955_042021-F.webp'],
    categoryId: 8,
    brandId: 15
  },
  {
    name: 'Apple iPhone 13 Pro Max (256 GB) - Azul Sierra',
    description: faker.lorem.paragraph(),
    model: 'iPhone 13 Pro Max',
    price: '368.499',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_768980-MLA47777512590_102021-F.webp'],
    categoryId: 8,
    brandId: 15
  }
]

// Consolas
const consoles = [
  {
    name: 'Sony PlayStation 5 825GB Standard color blanco y negro',
    description: faker.lorem.paragraph(),
    model: 'PlayStation 5',
    price: '175.999',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_739160-MLA44484414453_012021-F.webp'],
    categoryId: 9,
    brandId: 16
  },
  {
    name: 'Microsoft Xbox Series X 1TB Standard color negro',
    description: faker.lorem.paragraph(),
    model: 'Xbox Series X',
    price: '169.999',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_963862-MLA45041918050_032021-F.webp'],
    categoryId: 9,
    brandId: 17
  },
  {
    name: 'Nintendo Wii 512MB Standard color blanco',
    description: faker.lorem.paragraph(),
    model: 'Wii',
    price: '24.008',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_910960-MLA32731749007_112019-F.webp'],
    categoryId: 9,
    brandId: 18
  },
  {
    name: 'Nintendo Switch 32GB Standard color rojo neón, azul neón y negro',
    description: faker.lorem.paragraph(),
    model: 'Switch',
    price: '74.999',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_883371-MLA32731749246_112019-F.webp'],
    categoryId: 9,
    brandId: 18
  },
  {
    name: 'Sony Playstation 4 Ps4 Pro 1tb',
    description: faker.lorem.paragraph(),
    model: 'PlayStation 4 Pro',
    price: '109.989',
    image: ['https://http2.mlstatic.com/D_NQ_NP_2X_782069-MLA49844477754_052022-F.webp'],
    categoryId: 9,
    brandId: 16
  }
]

const products = laptops
  .concat(mouses)
  .concat(keyboards)
  .concat(monitors)
  .concat(headsets)
  .concat(webcams)
  .concat(tablets)
  .concat(smartphones)
  .concat(consoles)

// Países
const countries = [
  { countryName: 'Anguila' }, // 1
  { countryName: 'Antigua y Barbuda' }, // 2
  { countryName: 'Argentina' }, // 3
  { countryName: 'Aruba' }, // 4
  { countryName: 'Bahamas' }, // 5
  { countryName: 'Barbados' }, // 6
  { countryName: 'Belice' }, // 7
  { countryName: 'Bermudas' }, // 8
  { countryName: 'Bolivia' }, // 9
  { countryName: 'Bonaire' }, // 10
  { countryName: 'Brasil' }, // 11
  { countryName: 'Canadá' }, // 12
  { countryName: 'Chile' }, // 13
  { countryName: 'Colombia' }, // 14
  { countryName: 'Costa Rica' },
  { countryName: 'Cuba' },
  { countryName: 'Curazao' },
  { countryName: 'Dominicana' },
  { countryName: 'Ecuador' },
  { countryName: 'El Salvador' },
  { countryName: 'Estados Unidos' },
  { countryName: 'Granada' },
  { countryName: 'Groenlandia' },
  { countryName: 'Guadalupe' },
  { countryName: 'Guatemala' },
  { countryName: 'Guayana Francesa' },
  { countryName: 'Guyana' },
  { countryName: 'Haití' },
  { countryName: 'Honduras' },
  { countryName: 'Islas Caimán' },
  { countryName: 'Islas Malvinas' },
  { countryName: 'Islas Turcas y Caicos' },
  { countryName: 'Islas Vírgenes Británicas' },
  { countryName: 'Islas Vírgenes de los Estados Unidos' },
  { countryName: 'Jamaica' },
  { countryName: 'Martinica' },
  { countryName: 'México' },
  { countryName: 'Montserrat' },
  { countryName: 'Nicaragua' },
  { countryName: 'Panamá' },
  { countryName: 'Paraguay' },
  { countryName: 'Perú' },
  { countryName: 'Puerto Rico' },
  { countryName: 'República Domnicana' },
  { countryName: 'San Bartolomé' },
  { countryName: 'San Cristobal y Nieves' },
  { countryName: 'San Martín' },
  { countryName: 'San Pedro y Miquelón' },
  { countryName: 'San Vicente y las Granadinas' },
  { countryName: 'Santa Lucía' },
  { countryName: 'Surinam' },
  { countryName: 'Trinidad y Tobago' },
  { countryName: 'Uruguay' },
  { countryName: 'Venezuela' }
]

// Sucursales
const branches = [
  {
    state: 'Magdalena',
    city: 'Ciénaga',
    streetName: 'Calle 20',
    houseNumber: '11-23',
    countryId: 14
  },
  {
    state: 'Provincia de Buenos Aires',
    city: 'Buenos Aires, Capital Federal',
    streetName: 'Av. Eva Perón',
    houseNumber: '9612',
    countryId: 3
  }
]

const paymentTypes = [
  {
    paymentName: 'Tarjeta Crédito'
  }, // 1
  {
    paymentName: 'Tarjeta de Débito'
  }, // 2
  {
    paymentName: 'Pasarela de Pago'
  }// 3
]

// Usuarios
const users = [
  // Administradores
  {
    email: 'admin@admin.com',
    firstname: 'Administrador',
    lastname: 'Ecommerce',
    phone: '+54922445218',
    birthdate: '1996-11-11',
    isAdmin: true,
    enabled: true
  }, // 1
  // Usuarios
  {
    email: 'fede@gmail.com',
    firstname: 'Federico',
    lastname: 'Acuña',
    phone: '+54912345678',
    birthdate: '1990-01-01',
    isAdmin: false,
    enabled: true
  }, // 2
  {
    email: 'marce@gmail.com',
    firstname: 'Marcela',
    lastname: 'Utria',
    phone: '+57922305678',
    birthdate: '1999-07-05',
    isAdmin: false,
    enabled: true
  }, // 3
  {
    email: 'herny@gmail.com',
    firstname: 'Soy',
    lastname: 'Herny',
    phone: '+54942901678',
    birthdate: '2000-07-05',
    isAdmin: true,
    enabled: true
  }// 4
  // ACÁ SE PUEDEN AGREGAR MÁS USUARIOS SIGUIENDO EL EJEMPLO ANTERIOR
]

const cartItems = [
  // Productos del usuario 2
  {
    quantity: 1,
    userId: 2,
    productId: 1
  },
  {
    quantity: 2,
    userId: 2,
    productId: 15
  },
  {
    quantity: 1,
    userId: 2,
    productId: 20
  },
  // Productos del usuario 3
  {
    quantity: 5,
    userId: 3,
    productId: 5
  },
  {
    quantity: 9,
    userId: 3,
    productId: 7
  },
  {
    quantity: 1,
    userId: 3,
    productId: 25
  },
  // Productos del usuario 4
  {
    quantity: 1,
    userId: 4,
    productId: 9
  }

]

const userAddresses = [
  // Direcciones del usuario 2
  {
    postalCode: 'B1406',
    state: 'Provincia de Buenos Aires',
    city: 'Buenos Aires',
    streetName: 'Av. Eva Perón',
    houseNumber: '3454',
    deliveryInstructions: 'Casa de color blanco, con dos ventanas',
    userId: 2,
    countryId: 3// Argentina
  },
  // Direcciones del usuario 3
  {
    postalCode: '082020',
    state: 'Atlántico',
    city: 'Baranoa',
    streetName: 'Calle 20',
    houseNumber: '15-79',
    deliveryInstructions: 'A lado de la tienda del Junior',
    userId: 3,
    countryId: 14// Colombia
  },
  // Direcciones del usuario 4
  {
    postalCode: 'A4400',
    state: 'Provincia de Salta',
    city: 'Salta',
    streetName: 'Calle Paso de Los Patos',
    houseNumber: '1221',
    deliveryInstructions: 'Diagonal al boliche Los Pepes',
    userId: 4,
    countryId: 3// Argentina
  }
]

const userPayments = [
  // Métodos de pago del usuario 2
  {
    cardNumber: '4546400034748181',
    expirationDay: '2025-11-30',
    provider: 'Visa',
    userId: 2,
    paymentTypeId: 1
  },
  {
    provider: 'Mercado Pago',
    userId: 2,
    paymentTypeId: 3
  },
  // Métodos de pago del usuario 3
  {
    cardNumber: '5100010000000114',
    expirationDay: '2030-11-25',
    provider: 'MasterCard',
    userId: 3,
    paymentTypeId: 1
  },
  {
    provider: 'Mercado Pago',
    userId: 3,
    paymentTypeId: 3
  },
  // Métodos de pago del usuario 4
  {
    provider: 'Mercado Pago',
    userId: 4,
    paymentTypeId: 3
  }
]

const orders = [
  // Órdenes del usuario 2
  {
    status: 'CREATED',
    total: 102.098,
    userId: 2,
    userPaymentId: 1,
    userAddressId: 1
  },
  {
    status: 'CREATED',
    total: 82.999,
    userId: 2,
    userPaymentId: 1,
    branchId: 2
  }
]

const orderItems = [
  // Artículos de la orden 1
  {
    quantity: 1,
    price: 99.999,
    productId: 4,
    orderId: 1
  },
  {
    quantity: 1,
    price: 2.099,
    productId: 10,
    orderId: 1
  },
  // Artículos de la orden 2
  {
    quantity: 1,
    price: 82.999,
    productId: 5,
    orderId: 2
  }
]

const wishLists = [
  // Deseados del usuario 2
  {
    userId: 2,
    productId: 1
  },
  {
    userId: 2,
    productId: 2
  },
  {
    userId: 2,
    productId: 3
  },
  {
    userId: 2,
    productId: 4
  },
  {
    userId: 2,
    productId: 5
  },
  // Deseados del usuario 4
  {
    userId: 4,
    productId: 17
  }
]

const reviews = [
  // Reseñas del usuario 2
  {
    rating: 5,
    review: 'Muy bueno, lo recomiendo al 100%',
    userId: 2,
    productId: 19
  },
  {
    rating: 1,
    review: 'Si quieren perder su dinero, pueden comprarlo',
    userId: 2,
    productId: 11
  },
  // Reseñas de usuario 4
  {
    rating: 5,
    review: 'Es el mejor producto de la vida 😍!',
    userId: 4,
    productId: 11
  }
]

const superSeeder = async () => {
  // Carga de categorías
  for (let i = 0; i < categories.length; i++) {
    await Category.create(categories[i])
  }
  console.log('Categorías cargadas en la base de datos --> ✅')

  // Carga de Marcas
  for (let i = 0; i < brands.length; i++) {
    await Brand.create(brands[i])
  }
  console.log('Marcas cargadas en la base de datos --> ✅')

  // Carga de productos
  for (let i = 0; i < products.length; i++) {
    await Product.create(products[i])
  }
  console.log('Productos cargados en la base de datos --> ✅')

  // Carga de países
  for (let i = 0; i < countries.length; i++) {
    await Country.create(countries[i])
  }
  console.log('Países cargados en la base de datos --> ✅')

  // Carga de sucursales
  for (let i = 0; i < branches.length; i++) {
    await Branch.create(branches[i])
  }
  console.log('Sucursales cargadas en la base de datos --> ✅')

  // Carga de tipos de pago
  for (let i = 0; i < paymentTypes.length; i++) {
    await PaymentType.create(paymentTypes[i])
  }
  console.log('Tipos de pago cargados en la base de datos --> ✅')

  // Carga de usuarios
  for (let i = 0; i < users.length; i++) {
    await User.create(users[i])
  }
  console.log('Usuarios cargados en la base de datos --> ✅')

  // Carga de artículos del carrito
  for (let i = 0; i < cartItems.length; i++) {
    await CartItem.create(cartItems[i])
  }
  console.log('Artículos del carrito cargados en la base de datos --> ✅')

  // Carga de direcciones
  for (let i = 0; i < userAddresses.length; i++) {
    await UserAddress.create(userAddresses[i])
  }
  console.log('Direcciones cargadas en la base de datos --> ✅')

  // Carga de métodos de pago
  for (let i = 0; i < userPayments.length; i++) {
    await UserPayment.create(userPayments[i])
  }
  console.log('Métodos de pago cargados en la base de datos --> ✅')

  // Carga de órdenes
  for (let i = 0; i < orders.length; i++) {
    await Order.create(orders[i])
  }
  console.log('Órdenes cargadas en la base de datos --> ✅')

  // Carga de atículos en las órdenes
  for (let i = 0; i < orderItems.length; i++) {
    await OrderItem.create(orderItems[i])
  }
  console.log('Órdenes cargadas en la base de datos --> ✅')

  // Carga de lista de deseos
  for (let i = 0; i < wishLists.length; i++) {
    await WishList.create(wishLists[i])
  }
  console.log('Productos deseados cargados en la base de datos --> ✅')

  // Carga de reseñas
  for (let i = 0; i < reviews.length; i++) {
    await Review.create(reviews[i])
  }
  console.log('Reseñas cargadas en la base de datos --> ✅')
}

superSeeder()
  .then(() => console.log('🔥🔥🔥 Se cargaron todos los datos 🔥🔥🔥'))
  .catch(err => console.log('❌😭 OCURRIÓ UN ERROR 😭❌\n', err))
