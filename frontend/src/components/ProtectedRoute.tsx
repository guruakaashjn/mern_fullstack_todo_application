// import { Navigate } from "react-router-dom";

import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  children: React.ReactNode;
};

export default function ProtectedRoute({
  isAuthenticated,
  children,
}: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
