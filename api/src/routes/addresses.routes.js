const { Router } = require('express')
const router = Router()
const addressesController = require('../controllers/addresses.controller')
const middleware = require('../middleware')

router.use(middleware.decodeToken)

router.get('/', addressesController.get)

router.post('/', addressesController.create)

router.delete('/:addressId', addressesController.remove)

router.put('/:addressId', addressesController.update)

module.exports = router
