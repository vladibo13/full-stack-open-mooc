require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogRouter = require('./controllers/blog')

const app = express()
const mongoUrl = process.env.MONGO_URI

mongoose.connect(mongoUrl)
    .then(() => console.log('connected'))
    .catch(e => console.log(e.message))

app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app