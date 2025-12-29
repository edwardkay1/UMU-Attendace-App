import { Navigate, Outlet } from "react-router-dom";

interface Props {
  role: "student" | "lecturer" | "admin";
}

const RequireAuth = ({ role }: Props) => {
  const userRole = localStorage.getItem("role"); // mock auth

  if (userRole !== role) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RequireAuth;
