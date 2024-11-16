// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Create context
const AuthContext = createContext();

// Custom hook to use Auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register a new user with email and password
  const register = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  // Logout the current user
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  // Initialize reCAPTCHA for phone number authentication
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "recaptcha-container",
        {
          size: "invisible", // Use 'invisible' for invisible reCAPTCHA
          callback: (response) => {
            console.log("Recaptcha verified:", response);
          },
          "expired-callback": () => {
            console.error("Recaptcha expired. Please refresh the page.");
          },
        },
        auth
      );
    }
    return window.recaptchaVerifier;
  };

  // Send verification code to phone number
  const sendVerificationCode = async (phoneNumber) => {
    const appVerifier = setupRecaptcha();
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      return confirmationResult;
    } catch (error) {
      console.error("Error sending verification code:", error.message);
    }
  };

  // Verify OTP code
  const verifyOTP = async (confirmationResult, otp) => {
    try {
      const result = await confirmationResult.confirm(otp);
      setCurrentUser(result.user);
      console.log("Phone number verified!");
    } catch (error) {
      console.error("Error verifying OTP:", error.message);
    }
  };

  // Track the current authentication state (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Provide context values
  const value = {
    currentUser,
    register,
    login,
    logout,
    sendVerificationCode,
    verifyOTP,
    RecaptchaVerifier,
    auth,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
