import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
