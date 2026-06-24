import api from "./api";

export const register = async ({ name, email, password, role }) => {
  // send role as `globalRole` to match backend schema
  const res = await api.post("/api/auth/register", { name, email, password, globalRole: role });
  return res.data;
};

export const login = async ({ email, password }) => {
  const res = await api.post("/api/auth/login", { email, password });
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/api/auth/logout");
  localStorage.removeItem("pm_token");
  localStorage.removeItem("pm_user");
  return res.data;
};
