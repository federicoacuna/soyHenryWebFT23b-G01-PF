const { Router } = require('express')
const router = Router()
const { get, create, update, remove } = require('../controllers/countries.controller')

router.get('/', get)
router.post('/', create)
router.put('/', update)
router.delete('/:countryId', remove)

module.exports = router
