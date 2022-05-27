const branchService = require('../services/branches.service')
const usersService = require('../services/users.service')

const get = async (req, res) => {
  try {
    const branches = await branchService.getBranches()
    res.status(200).json(branches)
  } catch (error) {
    res.status(400).json(error)
  }
}
const create = async (req, res) => {
  const { state, city, streetName, houseNumber, countryId, phoneNumber } = req.body
  try {
    const user = await usersService.getUserByEmail(req.user.email)

    if (user.isAdmin) {
      if (!state || !city || !streetName || !houseNumber || !countryId) {
        const branches = await branchService.getBranches()
        return res.status(401).json({ data: branches, message: 'Faltan datos para poder agregar sucursal' })
      } else if (phoneNumber && ((isNaN((parseInt(phoneNumber)))))) {
        const branches = await branchService.getBranches()
        return res.status(401).json({ data: branches, mesagge: 'El telefóno solo puede contener numeros' })
      } else {
        const newBranch = await branchService.addNewBranch(req.body)
        const branches = await branchService.getBranches()
        if (!newBranch) { return res.status(400).json({ data: branches, message: 'La sucursal ya se encuentra agregada' }) } else {
          res.status(200).json({ data: branches, message: 'sucursal agregada con exito' })
        }
      }
    } else {
      res.status(400).json({ message: 'Acceso no autorizado' })
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

const update = async (req, res) => {
  const { id, state, city, streetName, houseNumber, countryId, phoneNumber } = req.body
  const user = await usersService.getUserByEmail(req.user.email)
  try {
    if (user.isAdmin) {
      if (!id || !state || !city || !streetName || !houseNumber || !countryId) {
        const branches = await branchService.getBranches()
        return res.status(400).json({ data: branches, message: 'Faltan datos para poder modificar la sucursal' })
      } else if (phoneNumber && ((isNaN((parseInt(phoneNumber)))))) {
        const branches = await branchService.getBranches()
        return res.status(401).json({ data: branches, messagge: 'El telefóno solo puede contener numeros' })
      } else {
        const modifiedBranch = await branchService.modifyBranch(req.body)
        const branches = await branchService.getBranches()

        if (!modifiedBranch) {
          return res.status(404).json({ data: branches, message: 'No se pudo agregar por que ya existe otra con esos datos o fue eliminada' })
        } else {
          res.status(200).json({ data: branches, message: 'Sucursal modificada con exito' })
        }
      }
    } else {
      res.status(400).json({ message: 'Acceso no autorizado' })
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

const branchStatus = async (req, res) => {
  const { id } = req.params
  try {
    const user = await usersService.getUserByEmail(req.user.email)
    if (user.isAdmin) {
      if (isNaN(parseInt(id))) {
        const branches = await branchService.getBranches()
        return res.status(400).json({ data: branches, message: 'Por favor ingrese un ID numerico' })
      } else {
        const deletedBranch = await branchService.changeBranchStatus(id)
        const branches = await branchService.getBranches()
        if (!deletedBranch) { return res.status(404).json({ data: branches, message: 'La sucursal que busca eliminar no existe' }) } else { return res.status(200).json({ data: branches, message: 'Estado de sucursal modificado con exito' }) }
      }
    } else {
      res.status(400).json({ message: 'Acceso no autorizado' })
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  get,
  create,
  update,
  branchStatus

}
