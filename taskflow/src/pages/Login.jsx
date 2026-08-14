import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Activity, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("nova@taskflow.io");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email.trim(), password);
      navigate("/dashboard");
    } catch (err) {
      // 401 from the API surfaces here as invalid credentials.
      setError(
        err.status === 401
          ? "Incorrect email or password."
          : err.message || "Could not sign in. Is the server running?"
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg bg-primary-500 flex items-center justify-center">
            <Activity size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl text-sidebar">TaskFlow</span>
        </div>

        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8">
          <h1 className="text-lg font-bold text-sidebar mb-1">Welcome back</h1>
          <p className="text-sm text-slate2-500 mb-6">
            Sign in to your student team workspace.
          </p>

          {error && (
            <div className="flex items-start gap-2 bg-primary-50 border border-primary-100 text-primary-700 text-sm rounded-lg px-3 py-2.5 mb-4">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border border-black/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border border-black/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary-500"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-sm text-slate2-500 mt-6 text-center">
            New here?{" "}
            <Link
              to="/register"
              className="text-primary-600 font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
        <p className="text-center text-xs text-slate2-400 mt-6">
          Demo: nova@taskflow.io (admin) · jane@taskflow.io (member) · password123
        </p>
      </div>
    </div>
  );
}
