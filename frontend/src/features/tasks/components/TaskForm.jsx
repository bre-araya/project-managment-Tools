import { useEffect, useState } from "react";
import api from "../../../services/api";

import "../styles/task-form.css";

function TaskForm({
  onSubmit,
  onClose,
}) {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
    priority: "Medium",
    status: "todo",
    project: localStorage.getItem("activeProjectId") || "",
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await api.get("/api/projects");
        setProjects(res.data || []);
      } catch (err) {
        console.error("Failed to load projects", err);
      }
    };

    loadProjects();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      id: Date.now(),
      ...form,
    });

    onClose();
  };

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
    >
      <input
        name="title"
        placeholder="Task Title"
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Task Description"
        rows="4"
        onChange={handleChange}
      />

      <select
        name="project"
        value={form.project}
        onChange={handleChange}
        required
      >
        <option value="">Select a project</option>
        {projects.map((project) => (
          <option key={project._id || project.id} value={project._id || project.id}>
            {project.name}
          </option>
        ))}
      </select>

      <input
        name="assignee"
        placeholder="Assignee Name"
        onChange={handleChange}
      />

      <input
        type="date"
        name="dueDate"
        onChange={handleChange}
      />

      <select
        name="priority"
        onChange={handleChange}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <select
        name="status"
        onChange={handleChange}
      >
        <option value="todo">
          To Do
        </option>

        <option value="progress">
          In Progress
        </option>

        <option value="review">
          Review
        </option>

        <option value="done">
          Done
        </option>
      </select>

      <div className="task-form-actions">
        <button
          type="button"
          className="cancel-btn"
          onClick={onClose}
        >
          Cancel
        </button>

        <button type="submit">
          Create Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;