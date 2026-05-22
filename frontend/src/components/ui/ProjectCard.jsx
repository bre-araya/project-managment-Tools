// src/components/ui/ProjectCard.jsx
import ProgressBar from "./ProgressBar";
import "../../styles/components/project-card.css";

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-header">
        <h3>{project.name}</h3>
        <span>{project.progress}%</span>
      </div>

      <p>Deadline: {project.deadline}</p>

      <ProgressBar value={project.progress} />
    </div>
  );
}

export default ProjectCard;