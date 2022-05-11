const { Role } = require('./src/db')
const saveProducts3 = async () => {
  try {
    const roles = await Role.create(
      {
        name: 'admin'
      })
    const role2 = await Role.create(
      {
        name: 'user'
      })
  } catch (err) {
    console.log(err)
  }
}

saveProducts3()
  .then(result => console.log('all good'))
  .catch(err => console.log(err))
