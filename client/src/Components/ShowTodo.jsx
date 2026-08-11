import { useContext } from "react";
import { TodoContext } from "../store/ContextApi";
import { apiClient } from "../lib/apiClient";
import { DeleteTaskRoute } from "../utils/constant";

const ShowTodo = () => {
  const { todos, refetchTodos, setUpdatedTask } = useContext(TodoContext);
  const handleDelete = async (id) => {
    try {
      const response = await apiClient.delete(`${DeleteTaskRoute}/${id}`, {
        withCredentials: true,
      });
      console.log(response.status);
      if (response.status === 200) {
        console.log("response :", response);
        refetchTodos();
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data?.message || error.message,
      );
    }
  };

  const handleUpdate =  (todo) => {
    setUpdatedTask(todo);
  };
  return (
    <div>
      <hr className="my-4 text-muted opacity-25" />
      <ul className="list-group list-group-flush gap-3">
        {todos.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted mt-2 mb-0">No tasks</p>
          </div>
        ) : (
          todos.map((todo) => (
            <li
              key={todo._id}
              className={`list-group-item d-flex align-items-start justify-content-between p-3 rounded-3 border shadow-sm transition-all ${
                todo.completed ? "bg-light opacity-75" : "bg-white"
              }`}
            >
              <div className="d-flex align-items-start gap-3 w-100 me-2">
                <div className="w-100">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span
                      className={`fs-5 ${
                        todo.completed
                          ? "text-decoration-line-through text-muted fw-normal"
                          : "fw-bold text-dark"
                      }`}
                    >
                      {todo.task}
                    </span>
                    <span
                      className={`badge ${
                        todo.status === "Completed" || todo.completed
                          ? "bg-success"
                          : todo.status === "In Progress"
                            ? "bg-warning text-dark"
                            : "bg-secondary"
                      }`}
                    >
                      {todo.status ||
                        (todo.completed ? "Completed" : "Pending")}
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
              <div className="d-flex gap-2 align-items-center">
                <button
                  onClick={() => handleUpdate(todo)}
                  className="btn btn-outline-primary btn-sm rounded-3 px-3"
                  title="Update Task"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="btn btn-outline-danger btn-sm rounded-3 px-3"
                  title="Delete Task"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ShowTodo;
