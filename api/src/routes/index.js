const { Router, json } = require('express')
const router = Router()

router.use(json())

module.exports = router
