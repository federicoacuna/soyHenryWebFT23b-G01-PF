import store from '../redux/store'
import axios from 'axios'

const endpoint = '/addresses'

export const getAddresses = async function () {
  const { token } = store.getState().users
  const { data } = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const postAddress = async function (newAddress) {
  newAddress.countryId = Number(newAddress.countryId)
  const { token } = store.getState().users
  console.log(token)
  const { data } = await axios.post(endpoint, newAddress, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  console.log(data)
  return data
}

export const putAddress = async function (addressId, updatedAddress) {
  const { token } = store.getState().users
  const { data } = await axios.get(`endpoint/${addressId}`, updatedAddress, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const deleteAddress = async function (addressId) {
  const { token } = store.getState().users
  const { data } = await axios.delete(`${endpoint}/${addressId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}
