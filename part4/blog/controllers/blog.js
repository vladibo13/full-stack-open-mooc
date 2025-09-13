const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const User = require('../models/users')


blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return res.status(400).json({ error: 'UserId missing or not valid' })
  }

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: user._id
  })

  const createdBlog = await blog.save()
  res.status(201).json(createdBlog)
})

blogRouter.delete('/:id', async(req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogRouter.put('/:id', async(req, res) => {
  const {title, author, url,likes} = req.body
  const updatedBlog = await Blog
    .findByIdAndUpdate(req.params.id, {title, author, url, likes}, {new: true})

  res.json(updatedBlog)  
  
})

module.exports = blogRouter