import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
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

  const handleLogin = async () => {
    try {
      await login(email, password);
      toast.success("Logged in successfully!  navigating to the form page");
      setTimeout(() => {
        navigate("/form")
      }, 2000); 
    } catch (error) {
      console.error(error.message);
      toast.error(error.message)
    }
  };

 

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 w-1/2">
        <h1 onClick={() => toast.success("click")} className="cursor-pointer">Login/Register</h1>
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
       
        {currentUser && <button onClick={handleLogout}>Logout</button>}
        <p>Current User: {currentUser ? currentUser.email : "None"}</p>
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
