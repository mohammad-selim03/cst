import { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import "./App.css";
import Layout from "./Layout/Layout";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate a 2-second loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div class="flex items-center justify-center min-h-screen">
          <div className="flex items-center justify-center">
            {" "}
            <img
              class="w-16 h-16 animate-spin"
              src="https://www.svgrepo.com/show/199956/loading-loader.svg"
              alt="Loading icon"
            />
          </div>
        </div>
      ) : (
        <>
          <Layout />
          <Toaster position="top-right" reverseOrder={false} />
        </>
      )}
    </div>
  );
}

export default App;
