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

test('there are four blog entrys', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(4)
})
  
test('the id field is called id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('post to api/blogs works', async () => {
    const blogpost = 
        {
            "title": "test title",
            "author": "test author",
            "url": "myurl",
            "likes": 69
        }
    
    await api.post('/api/blogs')
                .send(blogpost)
                .expect(201)
                .expect('Content-Type', /application\/json/)



})

afterAll(async () => {
  await mongoose.connection.close()
})