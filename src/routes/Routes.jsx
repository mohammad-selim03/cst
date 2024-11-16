import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Form from "../components/Form";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/form",
        element: <Form />,
      },
    ],
  },
]);
