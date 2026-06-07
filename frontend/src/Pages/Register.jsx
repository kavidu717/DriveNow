import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../Store/authStore.js";

export default function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // call API via zustand
      await register(firstName, lastName, email, password);

      // save email (important for OTP page refresh safety)
      localStorage.setItem("otpEmail", email);

      alert("OTP sent to your email!");

      // go to OTP page
      navigate("/verify-otp");

    } catch (err) {
      setError(
        err?.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <h2>Register</h2>

      <form onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
       
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

