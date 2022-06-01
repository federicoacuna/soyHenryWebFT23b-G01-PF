import axios from 'axios'

const endpoint = '/nodemailer'

export const subscribeNewsletter = async (email) => {
  const result = await axios.post(endpoint, { email })
  return result
}
