import TaskCard from "./TaskCard";

import "../styles/task-column.css";

function TaskColumn({ title, tasks, provided, snapshot }) {
  return (
    <div
      className={`task-column ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
      ref={provided.innerRef}
      {...provided.droppableProps}

    >

      <div className="column-header">
        <h3>{title}</h3>
        <span>{tasks.length}</span>
      </div>

      <div className="column-tasks">
        {tasks.map((task, index) => {
          const taskId = task?._id || task?.id || `task-${title}-${index}`;
          return <TaskCard key={taskId} task={task} index={index} />;
        })}
      </div>

      {provided.placeholder}
    </div>
  );
}

export default TaskColumn;

