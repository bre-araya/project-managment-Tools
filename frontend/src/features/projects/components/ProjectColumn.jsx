import ProjectCard from "./ProjectCard";
import "../styles/project-column.css";

function ProjectColumn({ title, projects, provided, snapshot }) {
  return (
    <div
      className={`project-column ${snapshot && snapshot.isDraggingOver ? "dragging-over" : ""}`}
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      <div className="column-header">
        <h3>{title}</h3>
        <span>{projects.length}</span>
      </div>

      <div className="column-items">
        {projects.map((project, index) => (
          <ProjectCard
            key={project._id || project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      {provided.placeholder}
    </div>
  );
}

export default ProjectColumn;
