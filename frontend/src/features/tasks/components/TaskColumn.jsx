import { Droppable } from "@hello-pangea/dnd";

import TaskCard from "./TaskCard";

import "../styles/task-column.css";

function TaskColumn({
  id,
  title,
  tasks,
}) {
  return (
    <div className="task-column">
      <div className="column-header">
        <h3>{title}</h3>

        <span>{tasks.length}</span>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className={`column-tasks ${
              snapshot.isDraggingOver
                ? "dragging-over"
                : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TaskColumn;