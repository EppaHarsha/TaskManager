const express = require("express");
const User = require("../models/userSchema");
const Task = require("../models/userTasks");
module.exports.add = async (req, res) => {
  const { title } = req.body;
  const newTask = new Task({
    title: title,
  });
  const addTask = await newTask.save();
  const currUser = await User.findById(req.user);
  currUser.tasks.push(addTask);
  const saveUser = await currUser.save();
    res.json({ message: "Task saved", success: true, task: addTask });
};

module.exports.showTasks = async (req, res) => {
  const currUser = await User.findById(req.user).populate("tasks");
  //console.log(currUser);
  res.json({ tasks: currUser.tasks });
};
module.exports.editTask = async (req, res) => {
  res.json({ message: "got to edit page" });
};

module.exports.getTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    res.json({ task });
  } catch (err) {
    res.status(400).json({ msg: "Task not found" });
  }
};
module.exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.json({ message: "Tasks not Found" });
    task.title = title;
    await task.save();
    res.json({ message: "Task updated successfully", task, success: true });
  } catch (error) {}
};

module.exports.delete = async (req, res) => {
  const { taskId } = req.params;
  try {
    const taskDelete = await Task.findByIdAndDelete(taskId);
    res.json({ message: "tasked deleted successfully", success: true });
  } catch (error) {}
};

module.exports.completed=async(req,res)=>{
    const{taskId}=req.params;
    try {
        const task = await Task.findById(taskId);
        task.status = task.status === "pending" ? "completed" : "pending";
        await task.save();
        res.json({message:`Task ${task.status}`,success:true,task:task});
    } catch (error) {
        
    }
}