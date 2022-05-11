const { User } = require('./src/db')
const saveProducts2 = async () => {
  try {
    const user = await User.create(
      {
        username: 'julitovargas',
        password: 'aYsu3dd',
        firstname: 'Mario',
        lastname: 'Vargas',
        email: 'lopez@gmail.com',
        phone: 152345679284,
        birthdate: '1994-06-26',
        deleted: false
      })
    const user2 = await User.create(
      {
        username: 'marioBros',
        password: 'aYsu3dds22',
        firstname: 'Lionel',
        lastname: 'Messi',
        email: 'soymessi10@gmail.com',
        phone: 15442479284,
        birthdate: '1994-04-29',
        deleted: false
      })
  } catch (err) {
    console.log(err)
  }
}

saveProducts2()
  .then(result => console.log('all good'))
  .catch(err => console.log(err))
