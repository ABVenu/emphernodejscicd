const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  text: { type: String },
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

const TodoModel  = mongoose.model("Todo", TodoSchema);

module.exports = TodoModel;
