const { Router } = require('express')
const router = Router()
const { create, erase, get } = require('../controllers/wishlists.controller')
const middleware = require('../middleware')

router.use(middleware.decodeToken)

router.get('/', get)

router.post('/', create)

router.delete('/:productId', erase)

module.exports = router
