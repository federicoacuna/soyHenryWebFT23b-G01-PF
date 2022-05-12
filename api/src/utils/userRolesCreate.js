const { Role } = require('../db')
const saveProducts3 = async () => {
  try {
    await Role.create(
      {
        name: 'admin'
      })
    await Role.create(
      {
        name: 'user'
      })
  } catch (err) {
    console.log(err)
  }
}

saveProducts3()
  .catch(err => console.log(err))
