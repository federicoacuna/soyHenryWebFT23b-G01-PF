const { Router } = require('express')
const router = Router()
const { create, remove, getUserAddresses } = require('../controllers/addresses.controller')

router.get('/:userId', getUserAddresses)

router.post('/', create)

router.delete('/:addressId', remove)

module.exports = router
