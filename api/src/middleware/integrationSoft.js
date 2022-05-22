const admin = require('../config/firebase-config')

class IntegrationSoft {
  async decodeToken (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]
    try {
      const decodeValue = await admin.auth().verifyIdToken(token)
      if (decodeValue) {
        req.user = decodeValue
        return next()
      } else {
        return next()
      }
    } catch (error) {
      return res.json(error)
    }
  }
}

module.export = new IntegrationSoft()
