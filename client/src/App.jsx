import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import TodoApp from "./Components/TodoApp";
import { TodoContext } from "./store/ContextApi";

function App() {
  const { isLoggedIn } = useContext(TodoContext);
  console.log("after login ", isLoggedIn);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? "/todo" : "/register"} />}
      />
      <Route
        path="/register"
        element={isLoggedIn ? <Navigate to="/todo" /> : <Register />}
      />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/todo" /> : <Login />}
      />
      <Route
        path="/todo"
        element={isLoggedIn ? <TodoApp /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
