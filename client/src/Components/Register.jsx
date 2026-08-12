import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../lib/apiClient";
import { RegisterRoute } from "../utils/constant";
import { TodoContext } from "../store/ContextApi";

export default function Register() {
  const navigate = useNavigate();
  const { setCurrentScreen } = useContext(TodoContext);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleRegister = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await apiClient.post(
        RegisterRoute,
        { name, email, password },
        { withCredentials: true },
      );

      if (response.data) {
        navigate("/login");
        setCurrentScreen("login");
      }
    } catch (error) {
      console.error(
        "Registration Error:",
        error.response?.data?.message || error.message,
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}
      >
        <div className="card-body">
          <h3 className="card-title text-center mb-4 fw-bold text-success">
            Register
          </h3>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="reg-name" className="form-label fw-semibold">
                Full Name
              </label>
              <input
                ref={nameRef}
                type="text"
                className="form-control"
                id="reg-name"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reg-email" className="form-label fw-semibold">
                Email Address
              </label>
              <input
                ref={emailRef}
                type="email"
                className="form-control"
                id="reg-email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reg-password" className="form-label fw-semibold">
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                className="form-control"
                id="reg-password"
                placeholder="Create a password"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success w-100 py-2 fw-bold mt-2"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-3">
            <span className="text-muted small">Already have an account? </span>
            <Link
              to="/login"
              className="text-decoration-none small text-success fw-bold"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
