import { useContext } from "react";
import { apiClient } from "../lib/apiClient";
import { LogoutRoute } from "../utils/constant";
import { TodoContext } from "../store/ContextApi";

const Logout = () => {
  const { handleLogout } = useContext(TodoContext);
  const HandleLogout = async () => {
    try {
      const response = await apiClient.post(LogoutRoute, {
        withCredentials: true,
      });

      console.log(response.status);
      if (response.status === 200) {
        handleLogout();
      }
    } catch (error) {
      alert("error :", error);
    }
  };
  return (
    <div>
      <button
        type="button"
        class="btn btn-danger"
        onClick={() => {
          HandleLogout();
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Logout;
