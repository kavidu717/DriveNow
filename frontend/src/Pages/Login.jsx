import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../Store/authStore.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);

      alert("Login successful");

      navigate("/");
    } catch (error) {
      setError(
        error?.response?.data?.message ||
        error ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Login</h2>

          <div>
            <label>Email</label>
            <br />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <br />

          <div>
            <label>Password</label>
            <br />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <br />

          {error && (
            <p style={{ color: "red" }}>
              {error}
            </p>
          )}

          <div>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}