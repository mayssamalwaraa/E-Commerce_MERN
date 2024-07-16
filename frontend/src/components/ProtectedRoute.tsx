import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth/authContect";

const ProtectedRoute = () => {
  const { isAuthonticated } = useAuth();
  if (!isAuthonticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
