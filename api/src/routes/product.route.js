const { Router} = require('express')
const router = Router()
const { get, create, update, remove } = require('../controllers/products.controller')

router.get('/', get);

router.post('/', create)

router.put('/:id', update)

router.delete('/:id', remove)


module.exports = router;