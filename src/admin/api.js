import { API_URL } from "../content.jsx";

const TOKEN_KEY = "agragami-admin-token";

export const getToken = () => {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
};

export const setToken = (t) => {
  try {
    if (t) sessionStorage.setItem(TOKEN_KEY, t);
    else sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // storage blocked: the admin just has to log in again after a refresh
  }
};

// Every call returns the JSON reply, or throws an Error with a readable message.
export async function api(path, { method = "GET", body, file } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let payload;
  if (file) {
    payload = new FormData();
    payload.append("file", file);
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(`${API_URL}/api${path}`, { method, headers, body: payload });
  } catch {
    throw new Error("Cannot reach the server. Check your internet connection.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || "Something went wrong.");
    err.status = res.status;
    throw err;
  }
  return data;
}
