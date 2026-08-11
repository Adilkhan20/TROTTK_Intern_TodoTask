import  { useState, useRef } from "react";
import { apiClient } from "../lib/apiClient";
import { AddTaskRoute } from "../utils/constant";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const taskRef = useRef();
  const descriptionRef = useRef();
  const statusRef = useRef();

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const task = taskRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const status = statusRef.current.value;
    console.log("task :", task);
    console.log("Description :", description);
    console.log("status :", status);
    try {
      const response = await apiClient.post(
        AddTaskRoute,
        { task, description, status },
        {
          withCredentials: true,
        },
      );
      console.log(response.status);
      if (response.status === 200) {
        console.log("response :", response);
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data?.message || error.message,
      );
    }

    if (!task) return;

    const newTodo = {
      task,
      description,
      status,
    };

    taskRef.current.value = "";
    descriptionRef.current.value = "";
    statusRef.current.value = "pending";
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
              <option value="Done"> Done</option>
              <option value="Block"> Block</option>
              <option value="InProgess"> InProgess</option>
              <option value="pending"> pending</option>
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
          <div className="col-12 mt-3">
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 fw-bold shadow-sm rounded-3 py-2"
            >
              Add
            </button>
          </div>
        </form>

        <hr className="my-4 text-muted opacity-25" />
        <ul className="list-group list-group-flush gap-3">
          {todos.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted mt-2 mb-0">No tasks</p>
            </div>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className={`list-group-item d-flex align-items-start justify-content-between p-3 rounded-3 border shadow-sm transition-all ${
                  todo.completed ? "bg-light opacity-75" : "bg-white"
                }`}
              >
                <div className="d-flex align-items-start gap-3 w-100 me-2">
                  <input
                    type="checkbox"
                    className="form-check-input mt-1 fs-5 cursor-pointer"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                  />
                  <div className="w-100">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span
                        className={`fs-5 ${
                          todo.completed
                            ? "text-decoration-line-through text-muted fw-normal"
                            : "fw-bold text-dark"
                        }`}
                      >
                        {todo.title}
                      </span>
                    </div>
                    {todo.description && (
                      <p
                        className={`mb-0 small ${
                          todo.completed
                            ? "text-decoration-line-through text-muted"
                            : "text-secondary"
                        }`}
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {todo.description}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(todo.id)}
                  className="btn btn-outline-danger btn-sm border-0 rounded-circle p-2"
                  title="Delete Task"
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
