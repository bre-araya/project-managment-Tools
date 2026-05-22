import "./../styles/project-card.css";

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>

      <p>Deadline: {project.deadline}</p>

      <div className="progress">
        <div style={{ width: `${project.progress}%` }} />
      </div>

      <span>{project.progress}% completed</span>
    </div>
  );
}

export default ProjectCard;