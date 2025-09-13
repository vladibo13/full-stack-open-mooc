const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')
const logger = require('../utils/logger')

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  logger.info(username, name, password)
  if(!password || !password.length < 3) {
    return res.status(400).json({ error: 'content missing' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

usersRouter.get('/', async(req, res) => {
  const users = await User.find()
  res.json({users})
})

module.exports = usersRouter