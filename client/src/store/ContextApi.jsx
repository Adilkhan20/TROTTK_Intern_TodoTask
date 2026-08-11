import { createContext, useState } from "react";

const TodoContext = createContext();

export const TodoListProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("register");

  return (
    <TodoContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, currentScreen, setCurrentScreen }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoListProvider;
