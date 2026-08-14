// Tiny fetch wrapper around the TaskFlow backend.
// - Base URL comes from VITE_API_URL, defaulting to the local dev server.
// - The JWT (issued at login) is kept in sessionStorage and attached as a
//   Bearer token on every request.
// - Non-2xx responses throw an Error carrying { status, data } so callers can
//   show the server's message (e.g. "Already clocked in today").

const BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const TOKEN_KEY = "taskflow_token";

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}

async function request(method, path, body, opts = {}) {
  const headers = { ...(opts.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let payload;
  if (body instanceof FormData) {
    payload = body; // let the browser set the multipart boundary
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  const res = await fetch(`${BASE}${path}`, { method, headers, body: payload });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const message =
      (data && data.error) || res.statusText || "Request failed";
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  get: (path, opts) => request("GET", path, undefined, opts),
  post: (path, body, opts) => request("POST", path, body, opts),
  patch: (path, body, opts) => request("PATCH", path, body, opts),
  del: (path, opts) => request("DELETE", path, undefined, opts),
  base: BASE,
};
