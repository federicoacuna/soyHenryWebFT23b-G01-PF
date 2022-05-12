const { Router } = require('express')
const router = Router()
const { create, remove, getById } = require('../controllers/adresses.controller')

router.get('/:userId', getById)

router.post('/', create)

router.delete('/:adressId', remove)

module.exports = router
