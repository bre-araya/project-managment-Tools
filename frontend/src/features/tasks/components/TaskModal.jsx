import TaskForm from "./TaskForm";

import "../styles/task-modal.css";

function TaskModal({
  onClose,
  onCreateTask,
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
        />
      </div>
    </div>
  );
}

export default TaskModal;