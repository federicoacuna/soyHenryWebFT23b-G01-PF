const { Router } = require('express')
const router = Router()
const middleware = require('../middleware')
const branchController = require('../controllers/branches.controllers')

router.use(middleware.decodeToken)
router.get('/', branchController.get)
router.post('/', branchController.create)
router.put('/:id', branchController.branchStatus)
router.put('/', branchController.update)
module.exports = router
