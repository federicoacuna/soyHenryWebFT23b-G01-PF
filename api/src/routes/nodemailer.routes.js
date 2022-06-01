const { Router } = require('express')
const router = Router()
const nodemailerControllers = require('../controllers/nodemailer.controllers')

router.post('/', nodemailerControllers.sendmail)

module.exports = router
