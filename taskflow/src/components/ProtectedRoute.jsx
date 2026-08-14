import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false, staffOnly = false }) {
  const { user, loading } = useAuth();

  // Wait for the session-restore call to finish so a page refresh doesn't
  // bounce a logged-in user straight to /login.
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream text-slate2-500">
        Loading…
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  // Members can't reach admin-only pages even by typing the URL. The server
  // also enforces this, so this is just a friendly redirect.
  if (adminOnly && user.accessRole !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // staffOnly pages are open to admins AND project managers, closed to members.
  if (staffOnly && user.accessRole !== "admin" && user.accessRole !== "manager") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
