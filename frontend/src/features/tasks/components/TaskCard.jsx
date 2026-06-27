import { Draggable } from "@hello-pangea/dnd";

import "../styles/task-card.css";

function TaskCard({
  task,
  index,
}) {
  const taskId = task?._id || task?.id || `task-${index}`;
  const priority = String(task?.priority || "Medium").toLowerCase();

  return (
    <Draggable
      draggableId={String(taskId)}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          className={`task-card ${
            snapshot.isDragging
              ? "dragging"
              : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4>{task?.title || "Untitled task"}</h4>

          <div className="task-progress-row">
            <span>{Math.round(task?.progress || 0)}%</span>
            <div className="task-progress-bar">
              <div style={{ width: `${Math.max(0, Math.min(100, Number(task?.progress || 0)))}%` }} />
            </div>
          </div>

          <div className="task-meta-row">
            <span className={`priority ${priority}`}>
              {task?.priority || "Medium"}
            </span>
            <span className="task-due-date">
              {task?.dueDate ? `Due ${new Date(task.dueDate).toLocaleDateString()}` : "No deadline"}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;