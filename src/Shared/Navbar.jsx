import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";


const Navbar = () => {
  const {logout} = useAuth();
  return (
    <div>
      <ul>
        <li>
          <Link to={"/form"}>Form</Link>
        </li>
        <li>
          <Link to={"/student-info"}>Student Info</Link>
        </li>
        <button onClick={() => logout()}>LogOut</button>
      </ul>
    </div>
  );
};

export default Navbar;
