import { Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";
import "./../styles/project-card.css";

import { useState } from "react";

function ProjectCard({ project, index }) {
  const id = project._id || project.id;
  const navigate = useNavigate();
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(project.name || "");

  const handleViewTasks = (e) => {
    e.stopPropagation();
    navigate(`/tasks/${id}`);
  };

  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided, snapshot) => (
        <div
          className={`project-card ${snapshot.isDragging ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="project-card-top">
            <div className="project-title-wrap">
              {editingName ? (
                <input
                  className="project-name-input"
                  value={nameValue}
                  autoFocus
                  onChange={(e) => setNameValue(e.target.value)}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setEditingName(false);
                      if (project.__onInlineUpdate) project.__onInlineUpdate(project._id || project.id, { name: nameValue });
                    } else if (e.key === "Escape") {
                      setEditingName(false);
                      setNameValue(project.name || "");
                    }
                  }}
                  onBlur={async () => {
                    setEditingName(false);
                    if (nameValue !== project.name && project.__onInlineUpdate) {
                      project.__onInlineUpdate(project._id || project.id, { name: nameValue });
                    }
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                />
              ) : (
                <h4 onDoubleClick={() => setEditingName(true)} className="project-title">{project.name}</h4>
              )}

              <span className={`status-badge status-${(project.status || "To Do").toLowerCase().replace(/\s+/g, "-")}`}>
                {project.status || "To Do"}
              </span>
            </div>

            <div className="project-actions">
              <button className="action-btn tasks" title="View Tasks" onClick={handleViewTasks}>📋</button>
              <button className="action-btn edit" title="Edit" onClick={(e) => { e.stopPropagation(); project.__onEdit && project.__onEdit(project); }}>✎</button>
              <button className="action-btn delete" title="Delete" onClick={(e) => { e.stopPropagation(); project.__onDelete && project.__onDelete(project); }}>🗑</button>
            </div>
          </div>

          {project.description ? <p className="project-desc">{project.description}</p> : null}

          <div className="meta">
            <div className="owner">
              {project.owner && project.owner.avatar ? (
                <img src={project.owner.avatar} alt={project.owner.name} className="owner-avatar" />
              ) : (
                <div className="owner-placeholder">{project.owner && project.owner.name ? project.owner.name[0] : "—"}</div>
              )}
              <span className="owner-name">{project.owner && project.owner.name ? project.owner.name : "—"}</span>
            </div>
            <div className="members">{project.members ? project.members.length : 0} members</div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default ProjectCard;