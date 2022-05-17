const { Router } = require('express')
const router = Router()
const { get, create, remove } = require('../controllers/paymentTypes.controller')

router.get('/', get)
router.post('/', create)
router.delete('/:paymentTypeId', remove)

module.exports = router
