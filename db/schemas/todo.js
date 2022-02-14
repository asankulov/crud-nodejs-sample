const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  category: {
    type: String
  }
});

module.exports = todoSchema;
