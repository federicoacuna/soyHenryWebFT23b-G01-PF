const userPayment = require('../services/userPayment.service')

const get = async (req, res) => {
  const { userId } = req.params

  if (!userId) {
    res.status(400).json({ error: 'Must provide user ID' })
  }
  try {
    const payments = await userPayment.getUserPayments(userId)
    payments ? res.json(payments) : res.status(400).json({ error: 'No payments where found' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const create = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    res.status(400).json({ error: 'Must provide user ID' })
  }
  try {
    await userPayment.createUserPayment(req.body) ? res.json({ message: 'Payment method was succesfully registered' }) : res.status(400).json({ error: 'Payment method already exists' })
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
    const wasUpdated = userPayment.removeUserPayment(paymentId)
    wasUpdated ? res.json({ message: 'Payment method was succesfully deleted' }) : res.status(400).json({ error: 'Payment method could not be deleted' })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  get,
  create,
  remove
}
