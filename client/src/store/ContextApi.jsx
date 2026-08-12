import { createContext, useEffect, useState } from "react";
import { apiClient } from "../lib/apiClient";
import { GetTaskRoute } from "../utils/constant";

export const TodoContext = createContext();

export const TodoListProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [currentScreen, setCurrentScreen] = useState("register");
  const [todos, setTodos] = useState([]);
  const [updatedTask, setUpdatedTask] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const refetchTodos = () => setRefreshTrigger((prev) => !prev);
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await apiClient.get(GetTaskRoute, {
          withCredentials: true,
        });
        
        setTodos(response.data.allTasks);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    if (isLoggedIn) {
      fetchTodos();
    }
  }, [isLoggedIn, refreshTrigger]);

  return (
    <TodoContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentScreen,
        setCurrentScreen,
        todos,
        setTodos,
        refetchTodos,
        updatedTask,
        setUpdatedTask,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoListProvider;
