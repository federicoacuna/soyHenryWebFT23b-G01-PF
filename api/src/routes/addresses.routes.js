const { Router } = require('express')
const router = Router()
const { create, remove } = require('../controllers/addresses.controller')
const middleware = require('../middleware')

router.use(middleware.decodeToken)

router.post('/', create)

router.delete('/:addressId', remove)

module.exports = router
