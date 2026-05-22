import {
  DragDropContext,
  Droppable,
} from "@hello-pangea/dnd";

import TaskColumn from "./TaskColumn";

function KanbanBoard({ tasks, onDragEnd }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        <Droppable droppableId="todo">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <TaskColumn
                title="To Do"
                tasks={tasks.todo}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="progress">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <TaskColumn
                title="In Progress"
                tasks={tasks.progress}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="done">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <TaskColumn
                title="Done"
                tasks={tasks.done}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;