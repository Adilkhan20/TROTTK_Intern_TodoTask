import { useContext } from "react";
import { TodoContext } from "../store/ContextApi";
import { apiClient } from "../lib/apiClient";
import { LogoutRoute } from "../utils/constant";

const Navbar = () => {
  const { handleLogout } = useContext(TodoContext);
  const HandleLogout = async () => {
    try {
      const response = await apiClient.post(LogoutRoute, {
        withCredentials: true,
      });
      if (response.status === 200) {
        handleLogout();
      }
    } catch (error) {
      console.log("error :", error);
    }
  };
  return (
    <nav className="navbar bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand">Trot TK </a>
        <button className="btn btn-danger" onClick={HandleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
