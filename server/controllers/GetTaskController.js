const Todo = require("../models/TodoSchema");
const jwt = require("jsonwebtoken");

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

module.exports = { GetTask };
