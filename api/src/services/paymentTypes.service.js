const { PaymentType } = require('../db')

async function getPaymentTypes () {
  return await PaymentType.findAll({
    attributes: ['id', 'paymentName']
  })
}

async function createPaymentType (data) {
  let { paymentName } = data

  paymentName = paymentName.toLowerCase().split(' ').map(n => { return n.charAt(0).toUpperCase() + n.slice(1) }).join(' ')

  const [, wasCreated] = await PaymentType.findOrCreate({
    where: {
      paymentName
    }
  })
  return wasCreated
}

function updatePaymentType () {
  // placeholder
}

async function removePaymentType (paymentTypeId) {
  return await PaymentType.destroy({ where: { id: paymentTypeId } })
}

module.exports = {
  getPaymentTypes,
  createPaymentType,
  updatePaymentType,
  removePaymentType
}
