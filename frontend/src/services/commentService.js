import api from "./api";

export const addComment = async (taskId, text) => {
  const res = await api.post("/api/comments", { task: taskId, text });
  return res.data;
};

export default {
  addComment,
};
