import TaskForm from "./TaskForm";

import "../styles/task-modal.css";

function TaskModal({
  onClose,
  onCreateTask,
  projectId,
}) {
  return (
    <div className="modal-overlay">
      <div className="task-modal">
        <div className="modal-header">
          <h2>Create Task</h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        <TaskForm
          onSubmit={onCreateTask}
          onClose={onClose}
          projectId={projectId}
        />
      </div>
    </div>
  );
}

export default TaskModal;