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
  console.log(token)
  const { data } = await axios.post(endpoint, newBranch, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  console.log(data)
  return data
}

export const putBranch = async function (updatedBranch) {
  const { token } = store.getState().users
  const { data } = await axios.get(endpoint, updatedBranch, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export const deleteBranch = async function (branchId) {
  const { token } = store.getState().users
  const { data } = await axios.delete(`${endpoint}/${branchId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}
