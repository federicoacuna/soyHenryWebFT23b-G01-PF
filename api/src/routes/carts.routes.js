const { Router } = require('express')
const router = Router()
const middleware = require('../middleware')
const cartController = require('../controllers/cart.controller.js')

router.use(middleware.decodeToken)

router.get('/', cartController.get)

router.post('/:productId', cartController.create)

router.post('/', cartController.create)

router.put('/', cartController.updateCart)

router.delete('/:productId', cartController.remove)

router.delete('/', cartController.removeAll)

module.exports = router
