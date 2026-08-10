import React, { useRef } from "react";
import { LoginRoute } from "../utils/constant";
import { apiClient } from "../lib/apiClient";

export default function Login() {
  const GoogleEmail = useRef();
  const Password = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(Password.current.value);
    console.log(GoogleEmail.current.value);

    const payload = {
      email: GoogleEmail.current.value,
      password: Password.current.value,
    };
    const response = await apiClient.post(LoginRoute, payload, {
      withCredentials: true,
    });
    console.log(response.status);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}
      >
        <div className="card-body">
          <h3 className="card-title text-center mb-4 fw-bold text-primary">
            Login
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                ref={GoogleEmail}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                ref={Password}
                required
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label
                  className="form-check-label text-muted small"
                  htmlFor="rememberMe"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-decoration-none small">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
