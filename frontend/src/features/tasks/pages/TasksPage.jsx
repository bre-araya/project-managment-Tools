import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";

import KanbanBoard from "../components/KanbanBoard";
import TaskModal from "../components/TaskModal";

import { initialTasks } from "../data/tasks";

import "../styles/tasks.css";

function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);

  const [openModal, setOpenModal] =
    useState(false);

  // CREATE TASK
  const handleCreateTask = (task) => {
    setTasks((prev) => ({
      ...prev,

      [task.status]: [
        task,
        ...prev[task.status],
      ],
    }));
  };

  // DRAG & DROP
  const handleDragEnd = (result) => {
    const { source, destination } =
      result;

    // dropped outside
    if (!destination) return;

    // same column reorder
    if (
      source.droppableId ===
      destination.droppableId
    ) {
      const column = [
        ...tasks[source.droppableId],
      ];

      const [removed] = column.splice(
        source.index,
        1
      );

      column.splice(
        destination.index,
        0,
        removed
      );

      setTasks({
        ...tasks,
        [source.droppableId]: column,
      });

      return;
    }

    // move between columns
    const sourceColumn = [
      ...tasks[source.droppableId],
    ];

    const destinationColumn = [
      ...tasks[destination.droppableId],
    ];

    const [movedTask] =
      sourceColumn.splice(
        source.index,
        1
      );

    // update task status
    movedTask.status =
      destination.droppableId;

    destinationColumn.splice(
      destination.index,
      0,
      movedTask
    );

    setTasks({
      ...tasks,

      [source.droppableId]:
        sourceColumn,

      [destination.droppableId]:
        destinationColumn,
    });
  };

  return (
    <div className="tasks-page">
      {/* HEADER */}
      <div className="tasks-header">
        <div>
          <h1>Tasks Board</h1>

          <p>
            Manage your team tasks
            efficiently
          </p>
        </div>

        <button
          onClick={() =>
            setOpenModal(true)
          }
        >
          Create Task
        </button>
      </div>

      {/* BOARD */}
      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        <KanbanBoard tasks={tasks} />
      </DragDropContext>

      {/* MODAL */}
      {openModal && (
        <TaskModal
          onClose={() =>
            setOpenModal(false)
          }
          onCreateTask={
            handleCreateTask
          }
        />
      )}
    </div>
  );
}

export default TasksPage;