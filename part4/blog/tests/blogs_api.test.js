const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog({ title: 'Test blog', author: 'Tester', url: 'http://example.com', likes: 1 })
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('verify id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  assert.ok(blog.id)
  assert.strictEqual(blog._id, undefined)

})

test('create a new blog', async () => {
  const response = await api.post('/api/blogs').send({
    "title": "title",
    "author": "author",
    "url": "url",
    "likes": 3
  })
  .set('Accept', 'application/json')
  .expect('Content-Type', /json/)
  .expect(201)

  assert.ok(response.body.id)

  const savedBlog = await Blog.findById(response.body.id)
  assert.ok(savedBlog)
  assert.strictEqual(savedBlog.title, response.body.title)

  const count = await Blog.countDocuments();
  assert.strictEqual(count, 2);
})

after(async () => {
  await mongoose.connection.close()
})