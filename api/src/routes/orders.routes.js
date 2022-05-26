const { Router } = require('express')
const router = Router()
const { create, remove, get, getById, update, mpValidator } = require('../controllers/orders.controller')
const middleware = require('../middleware')

// MERCADO PAGO
router.get('/mp', mpValidator)

router.use(middleware.decodeToken)

router.get('/', get)

router.get('/:orderId', getById)

router.post('/', create)

router.put('/:orderId', update)

router.delete('/:orderId', remove)

module.exports = router
