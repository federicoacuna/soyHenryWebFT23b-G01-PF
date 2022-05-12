const Payments = require('../services/payments.service')

export const get = (req, res) => {
  const { userId } = req.params

  if (!userId) {
    res.status(400).json({ error: 'Must provide user ID' })
  }
  try {
    const payments = Payments.getAllPayments(userId)
    payments ? res.json(payments) : res.status(400).json({ error: 'No payments where found' })
  } catch (error) {
    res.status(400).json(error)
  }
}

export const post = (req, res) => {
  const { userId } = req.body

  if (!userId) {
    res.status(400).json({ error: 'Must provide user ID' })
  }
  try {
    const wasCreated = Payments.create(req.body)
    wasCreated ? res.json({ message: 'Payment method was succesfully registered' }) : res.status(400).json({ error: 'Payment method could not registered' })
  } catch (error) {
    res.status(400).json(error)
  }
}

export const remove = (req, res) => {
  const { userId } = req.params

  if (!userId) {
    res.status(400).json({ error: 'Must provide user ID' })
  }
  try {
    const wasUpdated = Payments.update(req.body)
    wasUpdated ? res.json({ message: 'Payment method was succesfully registered' }) : res.status(400).json({ error: 'Payment method could not registered' })
  } catch (error) {
    res.status(400).json(error)
  }
}
