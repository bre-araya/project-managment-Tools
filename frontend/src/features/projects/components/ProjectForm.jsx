import { useState, useEffect } from "react";
import "./../styles/project-form.css";

function ProjectForm({ onSubmit, loading, initial = {} }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "To Do",
  });

  useEffect(() => {
    if (initial) {
      setForm((f) => ({ ...f, ...initial }));
    }
  }, [initial]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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