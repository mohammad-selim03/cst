import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
 
const Register = () => {
  const { register, currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      await register(email, password);  
      toast.success("Register successfull. navigating to the form page")
      
      setTimeout(() => {
        navigate("/form")
      }, 2000); 
    } catch (error) {
      alert(error?.message);
      console.error(error.message);
    }
  };

  return (
    <div>
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
    

        {/* {currentUser && <button onClick={handleLogout}>Logout</button>} */}
        <p>Current User: {currentUser ? currentUser.email : "None"}</p>
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
