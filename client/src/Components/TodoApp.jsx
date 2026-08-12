import { useContext, useEffect, useRef } from "react";
import { apiClient } from "../lib/apiClient";
import { AddTaskRoute, UpdateTaskRoute } from "../utils/constant";
import ShowTodo from "./ShowTodo";
import { TodoContext } from "../store/ContextApi";
import Logout from "./Logout";

export default function TodoApp() {
  const taskRef = useRef();
  const descriptionRef = useRef();
  const statusRef = useRef();
  const { refetchTodos, updatedTask, setUpdatedTask } = useContext(TodoContext);
  const resetForm = () => {
    if (taskRef.current) taskRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
    if (statusRef.current) statusRef.current.value = "pending";
  };
  useEffect(() => {
    if (updatedTask) {
      taskRef.current.value = updatedTask.task || "";
      descriptionRef.current.value = updatedTask.description || "";
      statusRef.current.value = updatedTask.status || "pending";
    } else {
      resetForm();
    }
  }, [updatedTask]);
  const handleCancelEdit = () => {
    setUpdatedTask(null);
    resetForm();
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const task = taskRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const status = statusRef.current.value;
    if (!task) return;
    if (updatedTask) {
      try {
        const response = await apiClient.put(
          `${UpdateTaskRoute}/${updatedTask._id}`,
          { task, description, status },
        );

        if (response.status === 200) {
          refetchTodos();
          setUpdatedTask(null);
          resetForm();
        }
      } catch (error) {
        console.error("Update Error:", error);
      }
    } else {
      try {
        const response = await apiClient.post(
          AddTaskRoute,
          { task, description, status },
          { withCredentials: true },
        );

        if (response.status === 200 || response.status === 201) {
          refetchTodos();
          resetForm();
        }
      } catch (error) {
        console.error(
          "Add Task Error:",
          error.response?.data?.message || error.message,
        );
      }
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "720px" }}>
      <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5 bg-white">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-danger display-6 mb-1">MERN Todo</h2>
          <p className="text-muted small">Trot Tk tasks and assignments</p>
        </div>
        <form onSubmit={handleAddTodo} className="row g-3 mb-4">
          <div className="col-12 col-md-8">
            <label className="form-label fw-semibold text-secondary small">
              Task
            </label>
            <input
              ref={taskRef}
              type="text"
              className="form-control form-control-lg shadow-sm"
              placeholder="What is the task?"
              required
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold text-secondary small">
              Status
            </label>
            <select
              ref={statusRef}
              className="form-select form-select-lg shadow-sm"
              defaultValue="pending"
            >
              <option value="Done">Done</option>
              <option value="Block">Block</option>
              <option value="InProgress">InProgress</option>
              <option value="pending">pending</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold text-secondary small">
              Description
            </label>
            <textarea
              ref={descriptionRef}
              className="form-control shadow-sm"
              rows="3"
              placeholder="Add more details or notes about this task..."
            ></textarea>
          </div>
          <div className="col-12 mt-3 d-flex gap-2">
            <button
              type="submit"
              className={`btn btn-lg w-100 fw-bold shadow-sm rounded-3 py-2 ${
                updatedTask ? "btn-primary" : "btn-primary"
              }`}
            >
              {updatedTask ? "Update" : "Add "}
            </button>

            {updatedTask && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="btn btn-outline-secondary btn-lg fw-bold shadow-sm rounded-3 py-2"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        <ShowTodo />
        <hr />
        <hr />
        <Logout></Logout>
      </div>
    </div>
  );
}
