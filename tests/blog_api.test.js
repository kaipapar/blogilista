const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three blog entrys', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(3)
})
  
test('the first post is a dummy', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].title).toBe('title')
})


afterAll(async () => {
  await mongoose.connection.close()
})