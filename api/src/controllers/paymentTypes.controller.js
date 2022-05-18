const PaymentTypes = require('../services/paymentTypes.service')

const get = async (req, res) => {
  try {
    const retrievedPaymentTypes = await PaymentTypes.getPaymentTypes()
    retrievedPaymentTypes ? res.json(retrievedPaymentTypes) : res.status(404).json({ error: 'No payment types where found' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const create = async (req, res) => {
  const { paymentName } = req.body

  if (!paymentName) {
    res.status(400).json({ error: 'Must provide a payment type' })
  }
  try {
    await PaymentTypes.createPaymentType(req.body) ? res.json({ message: 'Payment Type was succesfully registered' }) : res.status(400).json({ error: 'Payment Type already exists' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const remove = (req, res) => {
  const { paymentTypeId } = req.params

  if (!paymentTypeId) {
    res.status(400).json({ error: 'Payment Type Id must be provided' })
  }
  try {
    const wasRemoved = PaymentTypes.removePaymentType(paymentTypeId)
    wasRemoved ? res.json({ message: 'Payment Type was succesfully deleted' }) : res.status(400).json({ error: 'Payment Type could not be deleted' })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  get,
  create,
  remove
}
