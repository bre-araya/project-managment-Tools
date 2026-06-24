import api from "./api";

const authHeader = (token) => ({
  Authorization: `Bearer ${token || localStorage.getItem("pm_token")}`,
});

export const getProjects = async (token) => {
  const res = await api.get("/api/projects", { headers: authHeader(token) });
  return res.data;
};

export const createProject = async (data, token) => {
  const res = await api.post("/api/projects", data, { headers: authHeader(token) });
  return res.data;
};

export const getProject = async (id, token) => {
  const res = await api.get(`/api/projects/${id}`, { headers: authHeader(token) });
  return res.data;
};

export const updateProject = async (id, data, token) => {
  const res = await api.put(`/api/projects/${id}`, data, { headers: authHeader(token) });
  return res.data;
};

export const deleteProject = async (id, token) => {
  const res = await api.delete(`/api/projects/${id}`, { headers: authHeader(token) });
  return res.data;
};

export const inviteMember = async (id, payload, token) => {
  const res = await api.post(`/api/projects/${id}/invite`, payload, { headers: authHeader(token) });
  return res.data;
};

export default {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  inviteMember,
};
