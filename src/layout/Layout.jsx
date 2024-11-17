import React from "react";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/Navbar";

const Layout = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <ResponsiveAppBar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
