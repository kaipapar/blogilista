const User = require('../models/user')
const Blog = require('../models/blog')


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(blog => blog.toJSON())
}
module.exports = {
  usersInDb,
  blogsInDb
}