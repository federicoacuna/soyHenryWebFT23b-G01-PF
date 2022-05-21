import store from '../redux/store'
import axios from 'axios'

const { token } = store.getState()
const endpoint = '/addresses'

export const getAddresses = async function () {
  const { data } = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const postAddress = async function (newAddress) {
  newAddress.countryId = Number(newAddress.countryId)

  const { data } = await axios.post(endpoint, newAddress, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  console.log(data)
  return data
}

export const putAddress = async function (updatedAddress) {
  const { data } = await axios.get(endpoint, updatedAddress, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const deleteAddress = async function (addressId) {
  const { data } = await axios.delete(`${endpoint}/${addressId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}
