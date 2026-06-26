import { Droppable } from "@hello-pangea/dnd";

import TaskColumn from "./TaskColumn";

function KanbanBoard({ tasks }) {
  return (
    <div className="kanban-board">
      <Droppable droppableId="todo">
        {(provided, snapshot) => (
          <TaskColumn
            title="To Do"
            tasks={tasks.todo}
            provided={provided}
            snapshot={snapshot}
          />
        )}
      </Droppable>

      <Droppable droppableId="progress">
        {(provided, snapshot) => (
          <TaskColumn
            title="In Progress"
            tasks={tasks.progress}
            provided={provided}
            snapshot={snapshot}
          />
        )}
      </Droppable>

      <Droppable droppableId="review">
        {(provided, snapshot) => (
          <TaskColumn
            title="Review"
            tasks={tasks.review}
            provided={provided}
            snapshot={snapshot}
          />
        )}
      </Droppable>

      <Droppable droppableId="done">
        {(provided, snapshot) => (
          <TaskColumn
            title="Done"
            tasks={tasks.done}
            provided={provided}
            snapshot={snapshot}
          />
        )}
      </Droppable>
    </div>
  );
}

export default KanbanBoard;