const Users = require('../services/users.service')

const get = async (req, res) => {
  try {
    const users = await Users.getUserByEmail(req.query.email)
    users ? res.json(users) : res.status(400).json({ error: 'No users where found' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const getById = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: 'User ID is missing' })
  }
  try {
    const user = await Users.getById(id)
    user ? res.json(user) : res.status(400).json({ error: 'No user was found' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const create = async (req, res) => {
  try {
    const wasCreated = await Users.createUser(req.body)
    wasCreated ? res.json({ message: 'User succesfully created' }) : res.status(400).json({ error: 'Unable to create new user' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const update = async (req, res) => {
  const { id } = req.params
  req.body.userId = id

  if (!id) {
    return res.status(400).json({ error: 'User ID is missing' })
  }
  try {
    const wasUpdated = await Users.updateUser(req.body)
    wasUpdated ? res.json({ message: 'User succesfully updated' }) : res.status(400).json({ error: 'Unable to update user' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: 'User ID is missing' })
  }
  try {
    const wasRemoved = await Users.removeUser(id)
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
