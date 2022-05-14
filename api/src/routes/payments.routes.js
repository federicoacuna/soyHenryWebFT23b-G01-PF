const { Router } = require('express')
const router = Router()
const { create, remove, get } = require('../controllers/userPayments.controller')

router.get('/:userId', get)

router.post('/', create)

router.delete('/:paymentId', remove)

module.exports = router
