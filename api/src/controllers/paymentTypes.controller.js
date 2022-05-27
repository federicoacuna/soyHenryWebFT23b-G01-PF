const PaymentTypes = require('../services/paymentTypes.service')

const get = async (req, res) => {
  try {
    const retrievedPaymentTypes = await PaymentTypes.getPaymentTypes()
    retrievedPaymentTypes
      ? res.status(200).json({ data: retrievedPaymentTypes })
      : res.status(400).json({ error: 'No payment types where found' })
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
    const wasCreated = await PaymentTypes.createPaymentType(req.body)
    const all = await PaymentTypes.getPaymentTypes()
    wasCreated
      ? res.status(200).json({
        data: all,
        message: 'Payment Type was succesfully registered'
      })
      : res.status(400).json({
        data: all,
        error: 'Payment Type already exists'
      })
  } catch (error) {
    res.status(400).json(error)
  }
}

const remove = async (req, res) => {
  const { paymentTypeId } = req.params

  if (!paymentTypeId) {
    res.status(400).json({ error: 'Payment Type Id must be provided' })
  }
  try {
    const wasRemoved = await PaymentTypes.removePaymentType(paymentTypeId)
    const all = await PaymentTypes.getPaymentTypes()
    wasRemoved > 0
      ? res.status(200).json({
        data: all,
        message: 'Payment Type was succesfully deleted'
      })
      : res.status(400).json({
        data: all,
        error: 'Payment Type could not be deleted'
      })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  get,
  create,
  remove
}
