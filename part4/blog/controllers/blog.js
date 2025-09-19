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
  const user = req.user

  if (!user) {
    return res.status(401).json({ error: 'UserId missing or not valid' })
  }

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: user._id
  })

  const createdBlog = await blog.save()
  res.status(201).json({createdBlog: {
    title: createdBlog.title,
    author: createdBlog.author,
    url: createdBlog.url
  }})
})

blogRouter.delete('/:id', async(req, res) => {
  const blog = await Blog.findById(req.params.id)
  const user = req.user

  if (!user || !blog) {
    return res.status(401).json({ error: 'UserId missing or blog' })
  }

  if(blog.user.toString() !== user.id.toString()) {
    return res.status(403).json({ error: 'forbidden' })
  }

  await blog.deleteOne()
  res.status(204).end()


})

blogRouter.put('/:id', async(req, res) => {
  const userReq = req.user

  if (!userReq) {
    return res.status(401).json({ error: 'UserId missing or not valid' })
  }

  const {title, author, url,likes, user} = req.body
  const updatedBlog = await Blog
    .findByIdAndUpdate(req.params.id, {title, author, url, likes, user}, {new: true})

  res.json(updatedBlog)  
  
})

module.exports = blogRouter