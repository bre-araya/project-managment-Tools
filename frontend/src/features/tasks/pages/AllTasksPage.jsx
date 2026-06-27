import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import "../styles/all-tasks.css";

function AllTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // all, todo, progress, review, done
  const navigate = useNavigate();

  useEffect(() => {
    const loadAllTasks = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/tasks/all");
        setTasks(res.data || []);
      } catch (err) {
        console.error("Failed to load tasks", err);
      } finally {
        setLoading(false);
      }
    };

    loadAllTasks();
  }, []);

  const normalizeStatus = (status) => {
    const lower = status?.toString().trim().toLowerCase();
    if (lower === "in progress") return "progress";
    return lower;
  };

  const getStatusColor = (status) => {
    const normalized = normalizeStatus(status);
    switch (normalized) {
      case "todo":
        return "status-todo";
      case "progress":
        return "status-progress";
      case "review":
        return "status-review";
      case "done":
        return "status-done";
      default:
        return "status-default";
    }
  };

  const getPriorityColor = (priority) => {
    const lower = priority?.toLowerCase();
    switch (lower) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "priority-default";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return normalizeStatus(task.status) === filter;
  });

  const handleViewProject = (projectId) => {
    navigate(`/tasks/${projectId}`);
  };

  return (
    <div className="all-tasks-page">
      <div className="tasks-header">
        <div>
          <h1>All Tasks</h1>
          <p>View all your tasks across all projects</p>
        </div>
      </div>

      <div className="tasks-filter">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({tasks.length})
        </button>
        <button
          className={`filter-btn ${filter === "todo" ? "active" : ""}`}
          onClick={() => setFilter("todo")}
        >
          To Do ({tasks.filter((t) => normalizeStatus(t.status) === "todo").length})
        </button>
        <button
          className={`filter-btn ${filter === "progress" ? "active" : ""}`}
          onClick={() => setFilter("progress")}
        >
          In Progress ({tasks.filter((t) => normalizeStatus(t.status) === "progress").length})
        </button>
        <button
          className={`filter-btn ${filter === "review" ? "active" : ""}`}
          onClick={() => setFilter("review")}
        >
          Review ({tasks.filter((t) => normalizeStatus(t.status) === "review").length})
        </button>
        <button
          className={`filter-btn ${filter === "done" ? "active" : ""}`}
          onClick={() => setFilter("done")}
        >
          Done ({tasks.filter((t) => normalizeStatus(t.status) === "done").length})
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : filteredTasks.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks found</p>
        </div>
      ) : (
        <div className="tasks-table-container">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Project</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assignees</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task._id} className="task-row">
                  <td className="task-name">{task.title}</td>
                  <td className="project-name">
                    {task.project?.name || "Unknown Project"}
                  </td>
                  <td className="task-status">
                    <span className={`status-badge ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="task-priority">
                    <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="task-assignees">
                    {task.assignees && task.assignees.length > 0 ? (
                      <div className="assignee-list">
                        {task.assignees.slice(0, 2).map((assignee) => (
                          <div
                            key={assignee._id}
                            className="assignee-avatar"
                            title={assignee.name}
                          >
                            {assignee.avatar ? (
                              <img src={assignee.avatar} alt={assignee.name} />
                            ) : (
                              <span>{assignee.name?.[0] || "?"}</span>
                            )}
                          </div>
                        ))}
                        {task.assignees.length > 2 && (
                          <div className="assignee-more">
                            +{task.assignees.length - 2}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="no-assignee">—</span>
                    )}
                  </td>
                  <td className="task-action">
                    <button
                      className="view-btn"
                      onClick={() => handleViewProject(task.project._id)}
                      title="View in project board"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllTasksPage;
