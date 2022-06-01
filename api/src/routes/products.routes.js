const { Router } = require('express')
const router = Router()
const { get, create, update, remove, getById } = require('../controllers/products.controller')
const middleware = require('../middleware/integrationSoft')
const fileUpload = require('express-fileupload')({
  useTempFiles: true,
  tempFileDir: './tmp'
})

router.use(middleware.decodeSoft)

router.get('/', get)

router.get('/:id', getById)

router.post('/', fileUpload, create)

router.put('/:id', fileUpload, update)

router.delete('/:id', remove)

module.exports = router
