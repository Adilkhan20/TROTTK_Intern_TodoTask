const Todo = require("../models/TodoSchema");

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
    console.log("Error in deleteTask:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { deleteTask };
