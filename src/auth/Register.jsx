import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const { register, currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      toast.success("Register successfull. navigating to the form page");

      setTimeout(() => {
        navigate("/form");
      }, 2000);
    } catch (error) {
      alert(error?.message);
      console.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      console.log("Logged in with Google!");
      setTimeout(() => {
        navigate("/form");
      }, 2000);
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-1/2 mx-auto pt-20">
        <h1 className="text-xl md:text-2xl font-semibold text-center mb-5">Register</h1>
        <input
          className="border border-gray-500 rounded-md py-2 px-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border border-gray-500 rounded-md py-2 px-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <p>
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600">
            Login
          </Link>
        </p>
        {/* {currentUser && <button onClick={handleLogout}>Logout</button>} */}
        {/* <p>Current User: {currentUser ? currentUser.email : "None"}</p> */}
        <button type="submit" className="bg-green-500 text-white px-5 py-2 rounded-md">Register</button>
      </form>
      <div
        onClick={handleGoogleSignIn}
        className="px-2 py-2 cursor-pointer w-1/2 mx-auto mt-5 text-center rounded-md border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-300"
      >
        <button>Register with Google</button>
      </div>
    </div>
  );
};

export default Register;
