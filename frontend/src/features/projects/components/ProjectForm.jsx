import { useState } from "react";
import "./../styles/project-form.css";

function ProjectForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    name: "",
    deadline: "",
    progress: 0,
  });

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

      <input
        name="deadline"
        type="date"
        onChange={handleChange}
        required
      />

      <input
        name="progress"
        type="number"
        placeholder="Progress %"
        onChange={handleChange}
        min="0"
        max="100"
      />

      <button disabled={loading}>
        {loading ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
}

export default ProjectForm;