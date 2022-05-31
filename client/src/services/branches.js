import store from '../redux/store'
import axios from 'axios'

const endpoint = '/branches'

export const getBranches = async function () {
  const { token } = store.getState().users
  const { data } = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const postBranch = async function (newBranch) {
  newBranch.countryId = Number(newBranch.countryId)
  const { token } = store.getState().users
  const { data } = await axios.post(endpoint, newBranch, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const putBranch = async function (updatedBranch) {
  const { token } = store.getState().users
  const { data } = await axios.put(endpoint, updatedBranch, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const deleteBranch = async function (branchId) {
  const obj = { id: branchId }
  const { token } = store.getState().users
  const { data } = await axios.put(`${endpoint}/${branchId}`, obj, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}
