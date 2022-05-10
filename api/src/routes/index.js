const { Router } = require('express')
const router = Router()
const fs = require('fs')

fs.readdirSync(__dirname).forEach(file => {
  if (file !== 'index.js') {
    router.use(`/${file.split('.')[0]}`, require(`./${file}`))
  }
})

module.exports = router
