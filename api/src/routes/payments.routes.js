const { Router } = require('express')
const router = Router()
const { create, remove } = require('../controllers/payments.controller')
const middleware = require('../middleware')

router.use(middleware.decodeToken)

router.post('/', create)

router.delete('/:paymentId', remove)

module.exports = router
