import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {
    loginWithGoogle,
    login,
    register,
    currentUser,
    logout,
    sendVerificationCode,
    verifyOTP,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+880");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();

  const handleSendCode = async () => {
    if (!/^(\+8801)[3-9]\d{8}$/.test(phoneNumber)) {
      alert("Please enter a valid Bangladeshi mobile number.");
      return;
    }
    try {
      const result = await sendVerificationCode(phoneNumber);
      setConfirmationResult(result);
      alert("Verification code sent!");
    } catch (error) {
      console.error("Error sending code:", error.message);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }
    try {
      await verifyOTP(confirmationResult, otp);
      alert("Phone number verified!");
    } catch (error) {
      console.error("Error verifying OTP:", error.message);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in successfully!  navigating to the form page");
      setTimeout(() => {
        navigate("/form");
      }, 2000);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     toast.success("Logged out successfully!");
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  return (
    <>
      <form className="flex flex-col gap-3 w-1/2" onSubmit={handleLogin}>
        <div className="flex flex-col gap-1">
          <h1
            onClick={() => toast.success("click")}
            className="cursor-pointer text-xl font-semibold"
          >
            Login
          </h1>
          {!currentUser && <p>Login to fillup form</p>}
        </div>

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
          Don&apos;t have an account?{" "}
          <Link to={"/register"} className="text-blue-600">
            register
          </Link>
        </p>

        <button type="submit">Login</button>

        {/* <p>Current User: {currentUser ? currentUser.email : "None"}</p> */}
      </form>
      <div
        onClick={handleGoogleSignIn}
        className="px-2 py-2 cursor-pointer w-1/5 text-center rounded-md border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-300"
      >
        <button>Login with Google</button>
      </div>

      {/* <div>
        <h1>Phone Verification</h1>
        <div id="recaptcha-container"></div>
        <input
          className="border border-gray-500 rounded-md py-2 px-3"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
        <button onClick={handleSendCode}>Send Verification Code</button>
        {confirmationResult && (
          <>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <button onClick={handleVerifyOTP}>Verify OTP</button>
          </>
        )}
      </div> */}
    </>
  );
};

export default Login;
