const Todo = require("../models/TodoSchema");
const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");

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
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { updateTask };
