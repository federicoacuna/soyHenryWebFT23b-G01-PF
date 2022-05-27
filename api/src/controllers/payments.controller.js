const userPaymentService = require('../services/userPayments.service')
const usersService = require('../services/users.service.js')

async function get (req, res) {
  const user = await usersService.getUserByEmail(req.user.email)
  try {
    const allUserPayments = await userPaymentService.getUserPayments(user.id)

    allUserPayments
      ? res.status(200).json({ data: allUserPayments })
      : res.status(400).json({ error: 'No se encontraron direcciones' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const create = async (req, res) => {
  const user = await usersService.getUserByEmail(req.user.email)
  const newPayment = req.body
  newPayment.userId = user.id
  const requiredData = ['cardNumber', 'expirationDay', 'provider', 'paymentTypeId']
  let validationErrors = 'The following mandatory data is missing in your request: '
  const errorLength = validationErrors.length

  for (const column of requiredData) {
    newPayment[column] || (validationErrors += column + ' ')
  }
  if (validationErrors.length > errorLength) return res.status(400).json({ error: validationErrors })

  if (typeof (newPayment.expirationDay) === 'number') return res.status(400).json({ error: 'expiration date must meet the following format: YYYY/MM' })

  try {
    const wasCreated = await userPaymentService.createUserPayment(req.body)
    const allUserPayments = await userPaymentService.getUserPayments(user.id)
    wasCreated
      ? res.status(200).json({
        data: allUserPayments,
        message: 'Payment method was succesfully registered'
      })
      : res.status(400).json({
        error: 'Payment method could not registered'
      })
  } catch (error) {
    res.status(400).json(error)
  }
}

const remove = (req, res) => {
  const { paymentId } = req.params

  if (!paymentId) {
    res.status(400).json({ error: 'Payment Id must be provided' })
  }
  try {
    const wasUpdated = userPaymentService.removePayment(paymentId)
    wasUpdated > 0
      ? res.status(200).json({ message: 'Payment method was succesfully deleted' })
      : res.status(400).json({ error: 'Payment method could not be deleted' })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  create,
  remove,
  get
}
