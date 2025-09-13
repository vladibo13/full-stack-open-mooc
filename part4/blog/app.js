require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const app = express()

mongoose.connect(config.MONGODB_URI)
    .then(() => console.log('connected'))
    .catch(e => console.log(e.message))

app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app