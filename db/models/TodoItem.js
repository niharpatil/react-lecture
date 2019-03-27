const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoItemSchema = Schema({
  title: String,
})

module.exports = mongoose.model('todo', todoItemSchema)