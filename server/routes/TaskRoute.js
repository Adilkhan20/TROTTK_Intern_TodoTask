const express = require("express");
const { GetTask } = require("../controllers/GetTaskController");
const { updateTask } = require("../controllers/UpdateTaskContoller");
const { addTask } = require("../controllers/AddTaskController");
const { deleteTask } = require("../controllers/DeleteTaskController");
const IsAuthenticated = require("../middleware/IsAuthenticated");

const TaskRouter = express.Router();

TaskRouter.get("/getTask", IsAuthenticated, GetTask);
TaskRouter.post("/addTask", IsAuthenticated, addTask);

TaskRouter.put("/updateTask/:id", IsAuthenticated, updateTask);

TaskRouter.delete("/deleteTask/:id", IsAuthenticated, deleteTask);

module.exports = TaskRouter;
