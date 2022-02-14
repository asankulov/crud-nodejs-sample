const mongoose = require('mongoose');

const todoSchema = require('../schemas/todo');

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
