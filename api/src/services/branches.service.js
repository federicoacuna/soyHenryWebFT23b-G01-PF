const { Branch } = require('../db')

const getBranches = async () => {
  try {
    const branches = await Branch.findAll()
    return branches
  } catch (error) {
    return error
  }
}

const addNewBranch = async (branch) => {
  const { state, city, streetName, houseNumber, countryId, phoneNumber } = branch
  let data
  if (phoneNumber) {
    data = { state, city, streetName, houseNumber, countryId, phoneNumber }
  } else data = { state, city, streetName, houseNumber, countryId }

  try {
    const [, query] = await Branch.findOrCreate({
      where: data
    })
    return query
  } catch (error) {
    return error
  }
}

const modifyBranch = async (branch) => {
  const { state, city, streetName, houseNumber, countryId, phoneNumber, id } = branch
  let data
  if (phoneNumber) {
    data = { state, city, streetName, houseNumber, countryId, phoneNumber }
  } else data = { state, city, streetName, houseNumber, countryId }
  try {
    console.log('service back', branch)
    let modifiedBranch = await Branch.findOne({
      where: {
        id,
        deleted: false
      }
    })
    if (modifiedBranch) {
      // podria existir otra con esos datos pero con otro id
      const queryCheck = await Branch.findOne({
        where: { state, city, streetName, houseNumber, countryId }
      })
      if (queryCheck) { return null } else {
        modifiedBranch.set(data)
        modifiedBranch = await modifiedBranch.save()
        return modifiedBranch
      }
    } else return modifiedBranch
  } catch (error) {
    return error
  }
}

const changeBranchStatus = async (id) => {
  try {
    let branch = await Branch.findOne({
      where: {
        id
      }
    })
    if (branch) {
      if (branch.dataValues.deleted) {
        branch.set({
          deleted: false
        })
      } else { branch.set({ deleted: true }) }
      branch = await branch.save()
      return branch
    } else { return branch }
  } catch (error) {
    return error
  }
}
module.exports = {
  getBranches,
  addNewBranch,
  modifyBranch,
  changeBranchStatus
}
