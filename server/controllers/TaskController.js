const jwt = require("jsonwebtoken");
const Todo = require("../models/TodoSchema");

const addTask = async (req, res, next) => {
  try {
    const { task, description, status } = req.body;
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
    return res.status(500).json({
      Message: "Internal Server Error",
      error: error.message,
    });
  }
};

const GetTask = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const allTasks = await Todo.find({ User: userId }).sort({ _id: -1 });
    console.log("Fetched Tasks:", allTasks);

    if (allTasks.length === 0) {
      return res.status(200).json({
        Message: "Success",
        allTasks,
        info: "No task.",
      });
    }

    return res.status(200).json({ Message: "Success", allTasks });
  } catch (error) {
    return res.status(500).json({
      Message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.userId;
    console.log("deleted");
    if (!id) {
      return res.status(400).json({ message: "Task ID is required to delete" });
    }

    const deletedTask = await Todo.findOneAndDelete({ _id: id, User: userId });

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found or you are not authorized to delete this task",
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
      deletedData: deletedTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateTask = async (req, res, next) => {
  try {
    const params = req.params;
    const id = params.id;
    const userId = req.user.userId;
    const { task, description, status } = req.body;

    if (!id) {
      return res.status(400).json({
        Message: "Task ID is required",
      });
    }

    const UpdateTask = await Todo.findOneAndUpdate(
      { _id: id, User: userId },
      {
        task,
        description,
        status,
      },
      { new: true },
    );

    if (!UpdateTask) {
      return res.status(404).json({
        message: "Task not found or you are not authorized to update this task",
      });
    }

    return res.status(200).json({
      message: "success",
      Data: UpdateTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { addTask, GetTask, deleteTask, updateTask };
