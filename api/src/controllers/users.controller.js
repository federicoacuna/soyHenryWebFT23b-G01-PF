const usersService = require('../services/users.service')

const get = async (req, res) => {
  const email = req.user.email

  try {
    const user = await usersService.createUser(email)
    const userDetails = await usersService.getById(user.id)
    userDetails ? res.status(200).json({ data: user }) : res.status(400).json({ error: 'Error registering / signing in' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const getUsersList = async (req, res) => {
  const user = await usersService.getUserByEmail(req.user.email)
  if (user.isAdmin) {
    const users = await usersService.getUsers(user.id)
    users ? res.status(200).json({ data: users }) : res.status(400).json({ error: 'Not users to render' })
  } else {
    res.status(400).json({ error: 'You are not an admin' })
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
    user ? res.status(200).json({ data: user }) : res.status(400).json({ error: 'No user was found' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const create = async (req, res) => {
  const email = req.user.email

  try {
    const user = await usersService.createUser(email)
    user ? res.status(200).json({ data: user }) : res.status(400).json({ error: 'Error registering / signing in' })
  } catch (error) {
    res.status(400).json(error)
  }
}

const update = async (req, res) => {
  const user = await usersService.getUserByEmail(req.user.email)
  const { id } = req.params
  try {
    if (!id) {
      const userUpdated = await usersService.updateUser(req)
      userUpdated ? res.status(200).json({ data: userUpdated }) : res.status(400).json({ error: 'Unable to update user' })
    } else {
      if (user.isAdmin && req.body) {
        const userUpdated = await usersService.updateUser(req, id)
        if (userUpdated) {
          const users = await usersService.getUsers(user.id)
          res.status(200).json({ data: users })
        } else {
          res.status(400).json({ error: 'Unable to update user' })
        }
      } else {
        res.status(400).json({ error: 'No right credentials. Request denied' })
      }
    }
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
  remove,
  getUsersList
}
