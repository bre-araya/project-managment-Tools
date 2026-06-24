import { useState, useEffect } from "react";
import "../styles/projects.css";

import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import ProjectsKanban from "../components/ProjectsKanban";
import * as projectApi from "../../../services/projectService";

function ProjectsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectApi.getProjects();
        if (mounted) setProjects(data);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    return () => { mounted = false; };
  }, []);

  const handleAddProject = async (project) => {
    try {
      setLoading(true);
      const created = await projectApi.createProject(project);
      setProjects((prev) => [created, ...prev]);
      setOpenModal(false);
    } catch (err) {
      console.error("Create project failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMove = async (projectId, destStatus) => {
    try {
      await projectApi.updateProject(projectId, { status: destStatus });
      setProjects((prev) => prev.map(p => (p._id === projectId ? { ...p, status: destStatus } : p)));
    } catch (err) {
      console.error("Failed to move project", err);
    }
  };

  const [editing, setEditing] = useState(null);

  const handleEdit = (project) => {
    setEditing(project);
    setOpenModal(true);
  };

  const handleDelete = async (project) => {
    if (!confirm(`Delete project "${project.name}"? This cannot be undone.`)) return;
    try {
      await projectApi.deleteProject(project._id || project.id);
      setProjects((prev) => prev.filter(p => (p._id || p.id) !== (project._id || project.id)));
    } catch (err) {
      console.error("Delete failed", err);
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  const handleUpdate = async (payload) => {
    // payload is form data; merge with editing id
    const id = editing._id || editing.id;
    try {
      const updated = await projectApi.updateProject(id, payload);
      setProjects((prev) => prev.map(p => ((p._id || p.id) === id ? updated : p)));
    } catch (err) {
      console.error("Update failed", err);
      throw err;
    }
  };

  const handleInlineUpdate = async (projectId, payload) => {
    try {
      const updated = await projectApi.updateProject(projectId, payload);
      setProjects((prev) => prev.map(p => ((p._id || p.id) === projectId ? updated : p)));
    } catch (err) {
      console.error("Inline update failed", err);
    }
  };

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>Projects</h1>

        <button onClick={() => setOpenModal(true)}>
          + New Project
        </button>
      </div>

      {loading ? (
        <div>Loading projects...</div>
        ) : (
        <ProjectsKanban
          columns={["To Do","In Progress","Review","Done"]}
          projects={projects}
          onMove={handleMove}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onInlineUpdate={handleInlineUpdate}
        />
      )}

      {openModal && (
        <ProjectModal onClose={() => { setOpenModal(false); setEditing(null); }}
          onSubmit={editing ? handleUpdate : handleAddProject}
          initial={editing}
        />
      )}
    </div>
  );
}

export default ProjectsPage;