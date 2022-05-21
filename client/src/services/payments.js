import store from '../redux/store'
import axios from 'axios'

const { token } = store.getState()
const endpoint = '/payments'

export const getPayments = async function () {
  const { data } = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const postPayment = async function (newPayment) {
  const { data } = await axios.post(endpoint, newPayment, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const putPayment = async function (updatedPayment) {
  const { data } = await axios.get(endpoint, updatedPayment, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const deletePayment = async function (paymentId) {
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
  const { cartProducts, user, order } = store.getState()
  const orderAddress = user.userAddresses.find(address => address.id === order.userAddressId)

  const addres = {
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
    unit_price: Number(product.price)
  }))

  const body = {
    items,
    payer: {
      phone: {},
      identification: {},
      addres
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
      success: 'http://localhost:3000/confirmation',
      pending: 'http://localhost:3000/confirmation',
      failure: 'http://localhost:3000/confirmation'
    },
    differential_pricing: {},
    metadata: {
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
