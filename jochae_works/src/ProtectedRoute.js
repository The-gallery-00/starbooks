import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div>로딩중...</div>;  // ★ 중요

  if (!user) return <Navigate to="/" replace />;

  return children;
}
