const { Router } = require('express')
const router = Router()
const middleware = require('../middleware')
const branchController = require('../controllers/branches.controllers')

router.get('/', branchController.get)
router.use(middleware.decodeToken)

router.post('/', branchController.create)

router.put('/:id', branchController.branchStatus)

router.put('/', branchController.update)
module.exports = router
