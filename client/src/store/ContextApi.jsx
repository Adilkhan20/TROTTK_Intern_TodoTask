import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoListProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <TodoContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </TodoContext.Provider>
  );
};
