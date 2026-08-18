import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { api, setToken, getToken } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [supervisor, setSupervisor] = useState(null);
  // `loading` is true only while we restore an existing session on first load,
  // so ProtectedRoute can wait instead of bouncing you to /login on refresh.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function restore() {
      if (!getToken()) {
        setLoading(false);
        return;
      }
      try {
        const { user: me, supervisor: sup } = await api.get("/auth/me");
        if (!active) return;
        setUser(me);
        setSupervisor(sup || null);
      } catch {
        setToken(null); // token expired or invalid
      } finally {
        if (active) setLoading(false);
      }
    }
    restore();
    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const { token, user: me } = await api.post("/auth/login", {
      email,
      password,
    });
    setToken(token);
    setUser(me);
    try {
      const { supervisor: sup } = await api.get("/auth/me");
      setSupervisor(sup || null);
    } catch {
      setSupervisor(null);
    }
    return me;
  }, []);

  // Self-registration always creates a "member" server-side — admin is never
  // self-assignable. supervisorId is optional (defaults to a real admin).
  const register = useCallback(
    async ({ name, email, password, supervisorId }) => {
      const { token, user: me } = await api.post("/auth/register", {
        name,
        email,
        password,
        supervisorId,
      });
      setToken(token);
      setUser(me);
      try {
        const { supervisor: sup } = await api.get("/auth/me");
        setSupervisor(sup || null);
      } catch {
        setSupervisor(null);
      }
      return me;
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setSupervisor(null);
  }, []);

  const isAdmin = user?.accessRole === "admin";

  return (
    <AuthContext.Provider
      value={{ user, supervisor, loading, isAdmin, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
