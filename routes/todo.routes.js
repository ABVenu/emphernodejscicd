const express = require("express");
const TodoModel = require("../models/todo.model");
const authenticateToken = require("../middlewares/authenticateToken");

const TodoRoute = express.Router();

// Create Todo
TodoRoute.post("/add", authenticateToken, async (req, res) => {
  const { text } = req.body;
  const newTodo = new TodoModel({ text, userId: req.user.id });
  await newTodo.save();
  res.status(201).json({newTodo});
});

// Read Todos
TodoRoute.get("/get", authenticateToken, async (req, res) => {
  const todos = await TodoModel.find({ userId: req.user.id });
  res.json(todos);
});

// Update Todo
TodoRoute.put("/update/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  const todo = await TodoModel.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    { text, completed },
    { new: true }
  );
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  res.status(201).json(todo);
});

// Delete Todo
TodoRoute.delete("/delete/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const todo = await TodoModel.findOneAndDelete({ _id: id, userId: req.user.id });
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  res.json({ message: "Todo deleted successfully" });
});



module.exports = TodoRoute;