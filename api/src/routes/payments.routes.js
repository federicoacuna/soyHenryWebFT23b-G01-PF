const { Router } = require('express')
const router = Router()
const { create, remove, get } = require('../controllers/payments.controller')

router.get('/:userId', get)

router.post('/', create)

router.delete('/:paymentId', remove)

module.exports = router
