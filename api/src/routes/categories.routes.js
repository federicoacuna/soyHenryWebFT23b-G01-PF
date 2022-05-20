const { Router } = require('express')
const router = Router()
const { get, create } = require('../controllers/categories.controller')

router.get('/', get)

router.post('/', create)

module.exports = router
