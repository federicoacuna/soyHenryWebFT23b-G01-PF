const { Router } = require('express')
const router = Router()
const paymentController = require('../controllers/payments.controller')
const middleware = require('../middleware')

router.use(middleware.decodeToken)

router.get('/', paymentController.get)

router.post('/', paymentController.create)

router.delete('/:paymentId', paymentController.remove)

module.exports = router
