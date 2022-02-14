const express = require('express');
const router = express.Router();

const todoModel = require('../db/models/todo');

router.post('/todos', (req, res) => {
  const { text, category } = req.body;
  const todo = new todoModel({
    text,
    category,
  });
  todo.save((err) => {
    if (err) {
      return res.sendStatus(500);
    }
    return res.sendStatus(201);
  });
});

router.get('/todos', async (req, res) => {
  const todos = await todoModel.find().exec();
  
  return res.status(200).json({
    todos: todos.map(todo => ({
      _id: todo._id,
      text: todo.text,
      category: todo.category,
    })),
  });
});

router.get('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todo = await todoModel.findById(id).exec();
  
  return res.status(200).json({
    _id: todo._id,
    text: todo.text,
    category: todo.category,
  });
});

router.patch('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  await todoModel.findByIdAndUpdate(id, {
    ...data
  });
  
  return res.sendStatus(200);
});

router.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text, category } = req.body;
  await todoModel.findByIdAndUpdate(id, {
    text,
    category
  });
  
  return res.sendStatus(200);
});

router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await todoModel.findByIdAndRemove(id);
  
  return res.sendStatus(204);
});

router.delete('/todos', async (req, res) => {
  await todoModel.deleteMany();
  
  return res.sendStatus(204);
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).json({ msg: 'Hello, World!!!' });
});

module.exports = router;
