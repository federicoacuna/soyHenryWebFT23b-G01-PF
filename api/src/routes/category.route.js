const { Router } = require('express')
const router = Router()
const { get, create } = require('../controllers/category.controller')

router.get('/', get)
router.post('/', create)

module.exports = router
