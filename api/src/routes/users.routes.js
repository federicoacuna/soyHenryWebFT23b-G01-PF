const { Router } = require('express')
const router = Router()
const { get, create, update, remove, getById, getUsersList } = require('../controllers/users.controller')
const middleware = require('../middleware')

router.use(middleware.decodeToken)

router.get('/', get)

router.get('/list', getUsersList)

router.get('/:id', getById)

router.post('/', create)

router.put('/', update)

router.put('/:id', update)

router.delete('/:id', remove)

module.exports = router
