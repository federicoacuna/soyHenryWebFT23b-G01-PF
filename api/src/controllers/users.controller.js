const Users = require('../services/users.service')

const get = (req, res) => {
  try {
    const users = Users.get(req.query)
    users ? res.json(users) : res.status(400).json({ error: 'No users where found' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const getById = async (req, res) => {
  const { userId } = req.params

  if (!userId) {
    return res.status(400).json({ error: 'User ID is missing' })
  }
  try {
    const user = await Users.getById(userId)
    user ? res.json(user) : res.status(400).json({ error: 'No user was found' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const create = async (req, res) => {
  try {
    const wasCreated = await Users.create(req.body)
    wasCreated ? res.json({ message: 'User succesfully created' }) : res.status(400).json({ error: 'Unable to create new user' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const update = async (req, res) => {
  const { userId } = req.params

  if (!userId) {
    return res.status(400).json({ error: 'User ID is missing' })
  }
  try {
    const wasUpdated = await Users.update(req.body)
    wasUpdated ? res.json({ message: 'User succesfully updated' }) : res.status(400).json({ error: 'Unable to update user' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const remove = async (req, res) => {
  const { userId } = req.params

  if (!userId) {
    return res.status(400).json({ error: 'User ID is missing' })
  }
  try {
    const wasRemoved = await Users.remove(userId)
    wasRemoved ? res.json({ message: 'User succesfully removed' }) : res.status(400).json({ error: 'Unable to remove user' })
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
