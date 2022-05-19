const { Router } = require('express')
const router = Router()
const { create, erase } = require('../controllers/wishlists.controller')
const middleware = require('../middleware')

router.use(middleware.decodeToken)

router.post('/', create)
router.delete('/:productId', erase)
module.exports = router
