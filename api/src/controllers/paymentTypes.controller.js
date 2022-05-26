const PaymentTypes = require('../services/paymentTypes.service')

const get = async (req, res) => {
  try {
    const retrievedPaymentTypes = await PaymentTypes.getPaymentTypes()
    retrievedPaymentTypes ? res.status(200).json(retrievedPaymentTypes) : res.status(400).json({ error: 'No payment types where found' })
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
    await PaymentTypes.createPaymentType(req.body) ? res.status(200).json({ message: 'Payment Type was succesfully registered' }) : res.status(400).json({ error: 'Payment Type already exists' })
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
    wasRemoved > 0
      ? res.status(200).json({ message: 'Payment Type was succesfully deleted' })
      : res.status(400).json({ error: 'Payment Type could not be deleted' })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  get,
  create,
  remove
}
