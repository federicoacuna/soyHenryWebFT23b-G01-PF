const { Router } = require('express')
const router = Router()
const { get, create } = require('../controllers/reviews.controller')

router.get('/', get)

router.post('/', create)

module.exports = router
