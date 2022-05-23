const admin = require('../config/firebase-config')

class IntegrationSoft {
  async decodeSoft (req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (token) {
        const decodeValue = await admin.auth().verifyIdToken(token)
        if (decodeValue) {
          req.user = decodeValue
        }
      }
      return next()
    } catch (error) {
      return res.json(error)
    }
  }
}

module.exports = new IntegrationSoft()
