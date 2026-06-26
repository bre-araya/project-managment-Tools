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

          <span className={`priority ${priority}`}>
            {task?.priority || "Medium"}
          </span>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;