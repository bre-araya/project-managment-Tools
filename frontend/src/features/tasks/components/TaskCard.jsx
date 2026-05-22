import { Draggable } from "@hello-pangea/dnd";

import "../styles/task-card.css";

function TaskCard({
  task,
  index,
}) {
  return (
    <Draggable
      draggableId={task.id.toString()}
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
          <h4>{task.title}</h4>

          <span
            className={`priority ${task.priority.toLowerCase()}`}
          >
            {task.priority}
          </span>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;