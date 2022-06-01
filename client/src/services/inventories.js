import axios from 'axios'

const endpoint = '/inventories'
const endpointProducts = '/inventories/name'

export const getProductExistService = async (options) => {
  let urlString = endpointProducts
  urlString += '?'
  for (const param of Object.entries(options)) {
    urlString += `${param[0]}=${param[1]}&`
  }

  const { data } = await axios.get(urlString)
  return data
}

export const getAllInventoryService = async () => {
  const { data } = await axios.get(endpoint)
  return data
}

export const getAllStockBranchService = async (branchId) => {
  const { data } = await axios.get(`/inventories/name?branchId=${branchId}`)
  // console.log(data)
  return data
}

export const getStockProductBranchService = async (options, branchId) => {
  let urlString = endpointProducts
  urlString += '?'
  for (const param of Object.entries(options)) {
    urlString += `${param[0]}=${param[1]}&`
  }

  const { data } = await axios.get(urlString + 'branchId=' + branchId)
  return data
}

export const postProductInventory = async (newStock) => {
  const { data } = await axios.post(endpoint, newStock)
  return data
}

export const putProductInventory = async (product) => {
  const { data } = await axios.put(endpoint, product)
  return data
}
