const { Router } = require('express')
const router = Router()
const { get, create, remove } = require('../controllers/categories.controller')
const middleware = require('../middleware')

router.get('/', get)

router.use(middleware.decodeToken)

router.post('/', create)

router.delete('/:categoryId', remove)

module.exports = router
