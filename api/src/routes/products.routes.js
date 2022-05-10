const { Router } = require('express')
const router = Router()
const { get, create, update, remove, getId } = require('../controllers/products.controller')

router.get('/', get)

router.get('/:id', getId)

router.post('/', create)

router.put('/:id', update)

router.delete('/:id', remove)

module.exports = router
