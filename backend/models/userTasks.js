
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  status: { type: String, default: "pending" },

});
const Task = new mongoose.model("Task",taskSchema);

module.exports=Task;