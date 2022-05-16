import axios from 'axios'

export const createOrder = async (order) => {
  const { data } = await axios.post('/orders', order)

  return data
}
