const express = require("express");
const IsAuthenticated = require("../middleware/IsAuthenticated");
const { GetTask, addTask, updateTask, deleteTask } = require("../controllers/TaskController");

const TaskRouter = express.Router();

TaskRouter.get("/getTask", IsAuthenticated, GetTask);
TaskRouter.post("/addTask", IsAuthenticated, addTask);

TaskRouter.put("/updateTask/:id", IsAuthenticated, updateTask);

TaskRouter.delete("/deleteTask/:id", IsAuthenticated, deleteTask);

module.exports = TaskRouter;
