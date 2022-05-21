const { Router } = require('express')
const router = Router()
const { get, create } = require('../controllers/reviews.controller')
const middleware = require('../middleware')

router.use(middleware.decodeToken)

router.get('/', get)

router.post('/', create)

module.exports = router
