import store from '../redux/store'
import axios from 'axios'

const endpoint = '/payments'

export const getPayments = async function () {
  const { token } = store.getState()
  const { data } = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const postPayment = async function (newPayment) {
  const { token } = store.getState()
  const { data } = await axios.post(endpoint, newPayment, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const putPayment = async function (updatedPayment) {
  const { token } = store.getState()
  const { data } = await axios.get(endpoint, updatedPayment, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const deletePayment = async function (paymentId) {
  const { token } = store.getState()
  const { data } = await axios.delete(`${endpoint}/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

// MERCADO PAGO
export const createMercadoPagoPreferences = async function () {
  const url = 'https://api.mercadopago.com/checkout/preferences'
  const { cartProducts, user, order, addresses } = store.getState()
  const orderAddress = addresses.find(address => address.id === order.userAddressId)
  order.userId = user.id
  order.total = order.orderItems.reduce((acc, item) => {
    return acc + (item.quantity * item.price)
  }, 0)

  const address = {
    zip_code: orderAddress.postalCode.toString(),
    street_name: orderAddress.streetName,
    street_number: orderAddress.houseNumber
  }

  const items = cartProducts.map(product => ({
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
      pending: 'http://localhost:3001/confirmation/pending',
      failure: 'http://localhost:3001/confirmation/failure'
    },
    differential_pricing: {},
    metadata: {
      order
    }
  }

  const payment = await axios.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_MERCADO_PAGO_ACCESS_TOKEN}`
    }
  })

  return payment.data
}
