import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Activity, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [supervisorId, setSupervisorId] = useState("");
  const [supervisors, setSupervisors] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Load the list of admins so a new member can choose who supervises them.
  // Optional: if this fails, the server assigns a default supervisor.
  useEffect(() => {
    let active = true;
    api
      .get("/auth/supervisors")
      .then((list) => {
        if (active && Array.isArray(list)) setSupervisors(list);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        supervisorId: supervisorId ? Number(supervisorId) : undefined,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.status === 409
          ? "An account with that email already exists."
          : err.message || "Could not create your account."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg bg-primary-500 flex items-center justify-center">
            <Activity size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl text-sidebar">TaskFlow</span>
        </div>

        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8">
          <h1 className="text-lg font-bold text-sidebar mb-1">
            Create your account
          </h1>
          <p className="text-sm text-slate2-500 mb-6">
            You'll join as a team member.
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
                Full name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border border-black/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary-500"
              />
            </div>
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
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border border-black/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary-500"
              />
            </div>
            {supervisors.length > 0 && (
              <div>
                <label className="text-xs font-semibold text-slate2-500 uppercase tracking-wide">
                  Supervisor
                </label>
                <select
                  value={supervisorId}
                  onChange={(e) => setSupervisorId(e.target.value)}
                  className="mt-1 w-full border border-black/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary-500 bg-white"
                >
                  <option value="">Assign automatically</option>
                  {supervisors.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                      {s.role ? ` — ${s.role}` : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              {busy ? "Creating…" : "Create account"}
            </button>
          </form>

          <p className="text-sm text-slate2-500 mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
