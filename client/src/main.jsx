import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.jsx";
import { TodoListProvider } from "./store/ContextApi.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <TodoListProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TodoListProvider>,
);
