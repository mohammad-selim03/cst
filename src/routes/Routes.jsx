import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout/Layout";
import Login from "@/auth/Login";
import Register from "@/auth/Register";
import StudentInfo from "@/components/StudentInfo";
import PrivateRoute from "./PrivateRoute";
import Form from "@/components/Form";

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
        path: "/student-info",
        element: <StudentInfo />,
      },
      {
        path: "/form",
        element: (
          <PrivateRoute>
            <Form />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
