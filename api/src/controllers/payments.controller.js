const userPayment = require('../services/userPayment.service')

const get = (req, res) => {
  const { userId } = req.params

  if (!userId) {
    res.status(400).json({ error: 'Must provide user ID' })
  }
  try {
    const payments = userPayment.getAllPayments(userId)
    payments ? res.json(payments) : res.status(400).json({ error: 'No payments where found' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const create = (req, res) => {
  const { userId } = req.body

  if (!userId) {
    res.status(400).json({ error: 'Must provide user ID' })
  }
  try {
    const wasCreated = userPayment.create(req.body)
    wasCreated ? res.json({ message: 'Payment method was succesfully registered' }) : res.status(400).json({ error: 'Payment method could not registered' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const remove = (req, res) => {
  const { userId } = req.params

  if (!userId) {
    res.status(400).json({ error: 'Must provide user ID' })
  }
  try {
    const wasUpdated = userPayment.update(req.body)
    wasUpdated ? res.json({ message: 'Payment method was succesfully registered' }) : res.status(400).json({ error: 'Payment method could not registered' })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  get,
  create,
  remove
}
