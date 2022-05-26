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
  try {
    const query = await Branch.findOne({
      where: {
        countryId,
        state,
        city,
        streetName,
        houseNumber
      }
    })
    if (!query) {
      let newBranch
      if (phoneNumber) {
        newBranch = await Branch.create({ state, city, streetName, houseNumber, countryId, phoneNumber })
      } else { newBranch = await Branch.create({ state, city, streetName, houseNumber, countryId }) }
      return newBranch
    } else {
      query.exists = true
      return query
    }
  } catch (error) {
    return error
  }
}

const modifyBranch = async (branch) => {
  const { state, city, streetName, houseNumber, countryId, phoneNumber, id } = branch
  try {
    let modifiedBranch = await Branch.findOne({
      where: {
        id,
        deleted: false
      }
    })
    if (modifiedBranch) {
      if (phoneNumber) {
        modifiedBranch.set({
          state, city, streetName, houseNumber, countryId, phoneNumber
        })
      } else {
        modifiedBranch.set({
          state, city, streetName, houseNumber, countryId
        })
      }
      modifiedBranch = await modifiedBranch.save()
      return modifiedBranch
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
