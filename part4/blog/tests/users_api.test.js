const bcrypt = require('bcrypt')
const User = require('../models/users')
const { test, describe, beforeEach } = require('node:test')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    // await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation fail a fresh username', async () => {
    const newUser = {
      "username": "t",
      "name": "t",
      "password": "t",
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

  })
})