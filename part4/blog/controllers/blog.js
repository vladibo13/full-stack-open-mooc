const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const Users = require('../models/users')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  logger.info('hello')
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  const users = await Users.find()

  blog.user = users[0].id
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