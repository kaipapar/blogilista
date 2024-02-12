const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user.js')
/* 
blogsRouter.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
}) */
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  //const user = await User.findById("65b23f507ca7fe5a6c8812a5")
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})

/* Like a post! */
blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' });
    }

    blog.likes = body.likes;

    const updatedBlog = await blog.save();
    response.json(updatedBlog);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Server error' });
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter