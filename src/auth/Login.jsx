import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, register, currentUser, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("Logged in successfully!");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await register(email, password);
      alert("Registered successfully!");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-1/2">
      <h1>Login/Register</h1>
      <input
      className="border border-gray-500 rounded-md py-2 px-3"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
      className="border border-gray-500 rounded-md py-2 px-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
      {currentUser && <button onClick={handleLogout}>Logout</button>}
      <p>Current User: {currentUser ? currentUser.email : "None"}</p>
    </div>
  );
};

export default Login;
