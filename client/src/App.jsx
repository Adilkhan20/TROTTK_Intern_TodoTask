import { useContext } from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { TodoContext } from "./store/ContextApi";

function App() {
  const { isLoggedIn } = useContext(TodoContext);
  console.log(isLoggedIn);

  return <>{isLoggedIn ? <Login /> : <Register />}</>;
}

export default App;
