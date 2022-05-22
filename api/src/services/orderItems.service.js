const { OrderItem } = require('../db')

async function canReview (productId, userId) {
  const exists = await OrderItem.findOne({
    where: {
      productId,
      userId
    }
  })

  return !!exists
}

module.exports = {
  canReview
}
