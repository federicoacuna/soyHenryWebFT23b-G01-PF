import axios from 'axios'
import store from '../redux/store'

const endpoint = '/orders'

export const postOrder = async (newOrder) => {
  const { token } = store.getState().users
  newOrder.orderItems = newOrder.orderItems.map(item => {
    item.productId = item.id
    return item
  })
  newOrder.total = newOrder.orderItems.reduce((acc, item) => {
    return acc + (item.quantity * item.price)
  }, 0)

  const { data } = await axios.post('/orders', newOrder, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const getOrders = async (options = {}) => {
  const { token } = store.getState().users

  let urlString = endpoint
  urlString += '?'
  for (const param of Object.entries(options)) {
    urlString += `${param[0]}=${param[1]}&`
  }

  const { data } = await axios.get(urlString, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const getOrder = async (orderId) => {
  const { token } = store.getState().users
  const { data } = await axios.get(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const putOrder = async (orderId, status) => {
  const { token } = store.getState().users
  const { data } = await axios.put(`/orders/${orderId}`, { status }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const deleteOrder = async (orderId) => {
  const { token } = store.getState().users
  const { data } = await axios.delete(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const createMPCheckout = async function (newOrder) {
  const url = 'https://api.mercadopago.com/checkout/preferences'

  const address = {
    zip_code: newOrder.address.postalCode.toString(),
    street_name: newOrder.address.streetName,
    street_number: newOrder.address.houseNumber
  }

  const items = newOrder.orderItems.map(product => ({
    title: product.name,
    description: product.description,
    picture_url: product.image[0],
    category_id: product.categoryId,
    quantity: product.quantity,
    currency_id: 'ARS',
    unit_price: Number(product.price.replace('.', ''))
  }))

  const body = {
    items,
    payer: {
      phone: {},
      identification: {},
      addres: address
    },
    payment_methods: {
      excluded_payment_methods: [
        {}
      ],
      excluded_payment_types: [
        {}
      ]
    },
    shipments: {
      free_methods: [
        {}
      ],
      receiver_address: {}
    },
    back_urls: {
      success: 'http://localhost:3001/orders/mp',
      pending: 'http://localhost:3000',
      failure: 'http://localhost:3000'
    },
    differential_pricing: {},
    metadata: {
      ...newOrder
    }
  }
  console.log(body)
  const payment = await axios.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_MERCADO_PAGO_ACCESS_TOKEN}`
    }
  })
  console.log(payment.data)
  return payment.data
}
