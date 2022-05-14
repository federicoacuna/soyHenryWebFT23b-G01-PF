import axios from 'axios'

export const getBrandsService = async () => {
  const { data } = await axios.get('/brands')

  return data
}
