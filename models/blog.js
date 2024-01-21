const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

blogSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Blog', blogSchema)