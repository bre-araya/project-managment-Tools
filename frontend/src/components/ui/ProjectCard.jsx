// src/components/ui/ProjectCard.jsx
import ProgressBar from "./ProgressBar";
import "../../styles/components/project-card.css";

function ProjectCard({ project }) {
  const progress = Math.max(0, Math.min(100, Number(project.progress || 0)));
  const deadline = project.deadline ? new Date(project.deadline).toLocaleDateString() : "No deadline";

  return (
    <div className="project-card">
      <div className="project-header">
        <h3>{project.name}</h3>
        <span>{progress}%</span>
      </div>

      <p>Deadline: {deadline}</p>

      <ProgressBar value={progress} />
    </div>
  );
}

export default ProjectCard;