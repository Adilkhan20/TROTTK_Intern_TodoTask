const jwt = require("jsonwebtoken");
const Todo = require("../models/TodoSchema");

const addTask = async (req, res, next) => {
  try {
    const { task, description, status } = req.body;
    console.log("request comming ", task);
    const UserId = req.user.userId;
    const TaskDatabase = await Todo.create({
      User: UserId,
      task,
      description,
      status,
    });
    return res.status(200).json({
      Message: "Success",
      TaskDatabase,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addTask };
