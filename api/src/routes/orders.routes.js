const { Router } = require('express')
const router = Router()
const { create, remove, get, update } = require('../controllers/orders.controller')

router.get('/', get)

router.get('/:orderId', get)

router.post('/', create)

router.put('/:orderId', update)

router.delete('/:orderId', remove)

module.exports = router
