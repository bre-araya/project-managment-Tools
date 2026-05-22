import { useState } from "react";
import "../styles/projects.css";

import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";

function ProjectsPage() {
  const [openModal, setOpenModal] = useState(false);

  const [projects, setProjects] = useState([
    { id: 1, name: "Website Redesign", progress: 70, deadline: "June 10" },
    { id: 2, name: "Mobile App", progress: 40, deadline: "June 20" },
  ]);
  const handleAddProject = (project) => {
    const newProject = {
      id: Date.now(),
      ...project,
    };

    setProjects((prev) => [newProject, ...prev]); // update UI instantly
    setOpenModal(false);
  };

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>Projects</h1>

        <button onClick={() => setOpenModal(true)}>
          + New Project
        </button>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {openModal && (
        <ProjectModal onClose={() => setOpenModal(false)}
        onSubmit= {handleAddProject} />
      )}
    </div>
  );
}

export default ProjectsPage;