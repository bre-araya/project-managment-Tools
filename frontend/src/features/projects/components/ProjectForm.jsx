import { useState, useEffect } from "react";
import api from "../../../services/api";
import "./../styles/project-form.css";

function ProjectForm({ onSubmit, loading, initial = {} }) {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: initial?.name || "",
    description: initial?.description || "",
    status: initial?.status || "To Do",
    assignee: initial?.assignee || "",
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await api.get("/api/auth/users");
        setUsers(res.data || []);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };

    loadUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <input
        name="name"
        placeholder="Project Name"
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Short description (optional)"
        onChange={handleChange}
        rows={3}
      />

      <label>Assign to user</label>
      <select name="assignee" onChange={handleChange} value={form.assignee || ""}>
        <option value="">No assignee</option>
        {users.map((user) => (
          <option key={user._id || user.id} value={user._id || user.id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>

      <label>Initial Status</label>
      <select name="status" onChange={handleChange} defaultValue="To Do">
        <option>To Do</option>
        <option>In Progress</option>
        <option>Review</option>
        <option>Done</option>
      </select>

      <button disabled={loading}>
        {loading ? "Saving..." : (initial && initial.name ? "Save Changes" : "Create Project")}
      </button>
    </form>
  );
}

export default ProjectForm;