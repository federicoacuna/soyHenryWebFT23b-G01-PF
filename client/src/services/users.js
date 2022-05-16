import axios from 'axios'

export const sendToken = async (token) => {
  const { data } = await axios.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}
