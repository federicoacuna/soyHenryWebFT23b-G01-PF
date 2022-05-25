const usersService = require('../services/users.service')

const get = async (req, res) => {
  const email = req.user.email

  try {
    const user = await usersService.createUser(email)
    const userDetails = await usersService.getById(user.id)
    userDetails ? res.status(200).json(userDetails) : res.status(400).json({ error: 'Error registering / signing in' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const getById = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: 'User ID is missing' })
  } else if (isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'User ID must be an integer' })
  }
  try {
    const user = await usersService.getById(id)
    user ? res.status(200).json(user) : res.status(400).json({ error: 'No user was found' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const create = async (req, res) => {
  const email = req.user.email

  try {
    const user = await usersService.createUser(email)
    user ? res.status(200).json(user) : res.status(400).json({ error: 'Error registering / signing in' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const update = async (req, res) => {
  try {
    const user = await usersService.updateUser(req)
    user ? res.status(200).json(user) : res.status(400).json({ error: 'Unable to update user' })
  } catch (error) {
    res.status(404).json(error)
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: 'User ID is missing' })
  }
  if (!isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'User ID must be an integer' })
  }
  try {
    const wasRemoved = await usersService.removeUser(id)
    wasRemoved > 0
      ? res.status(200).json({ message: 'User succesfully removed' })
      : res.status(400).json({ error: 'Unable to remove user' })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove
}
