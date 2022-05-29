const { Router } = require('express')
const router = Router()
const { get, getByQuery, create, update } = require('../controllers/inventories.controller')

router.get('/', get)

router.get('/name', getByQuery)

router.post('/', create)

router.put('/', update)

module.exports = router
