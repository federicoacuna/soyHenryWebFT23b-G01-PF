const get = (req, res) => {
  res.json({ message: 'Accessing the categories' })
}
const create = (req, res) => {
  res.json({ message: 'Creating a category' })
}

module.exports = {
  get,
  create
}
