import { useEffect, useState } from "react";
import commentService from "../../../services/commentService";
import "../styles/task-modal.css";

function TaskDetails({ task, onClose, onSave }) {
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "To Do",
    priority: task?.priority || "medium",
    dueDate: task?.dueDate ? task.dueDate.split("T")[0] : "",
    progress: task?.progress || 0,
    assignee: task?.assignees?.[0]?._id || task?.assignees?.[0]?.id || "",
    text: "",
  });
  const [comments, setComments] = useState(task?.comments || []);
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "To Do",
      priority: task?.priority || "medium",
      dueDate: task?.dueDate ? task.dueDate.split("T")[0] : "",
      progress: task?.progress || 0,
      assignee: task?.assignees?.[0]?._id || task?.assignees?.[0]?.id || "",
    }));
    setComments(task?.comments || []);
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onSave(task._id || task.id, {
        title: form.title,
        description: form.description,
        status: form.status,
        priority: form.priority,
        dueDate: form.dueDate || null,
        progress: Number(form.progress || 0),
      });
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save task.");
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!form.text.trim()) return;
    setCommentLoading(true);
    try {
      const newComment = await commentService.addComment(task._id || task.id, form.text.trim());
      setComments((prev) => [newComment, ...prev]);
      setForm((prev) => ({ ...prev, text: "" }));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add comment.");
    } finally {
      setCommentLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="task-modal task-details-modal">
        <div className="modal-header">
          <h2>Task details</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Task Title"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            required
          />

          <textarea
            name="description"
            placeholder="Task Description"
            rows="4"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          />

          <div className="task-form-row">
            <label>
              Status
              <select value={form.status} onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Review</option>
                <option>Done</option>
              </select>
            </label>

            <label>
              Priority
              <select value={form.priority} onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value }))}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>

          <div className="task-form-row">
            <label>
              Due date
              <input type="date" value={form.dueDate} onChange={(e) => setForm((prev) => ({ ...prev, dueDate: e.target.value }))} />
            </label>

            <label>
              Progress
              <input
                type="number"
                min="0"
                max="100"
                value={form.progress}
                onChange={(e) => setForm((prev) => ({ ...prev, progress: e.target.value }))}
              />
            </label>
          </div>

          {error ? <div className="login__error">{error}</div> : null}

          <div className="task-form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Close</button>
            <button type="submit" disabled={loading}>{loading ? "Saving..." : "Save task"}</button>
          </div>
        </form>

        <div className="task-comments-section">
          <h3>Comments</h3>
          <form className="task-comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              placeholder="Add an update..."
              value={form.text}
              onChange={(e) => setForm((prev) => ({ ...prev, text: e.target.value }))}
              rows="3"
            />
            <button type="submit" disabled={commentLoading || !form.text.trim()}>
              {commentLoading ? "Posting..." : "Post comment"}
            </button>
          </form>

          <div className="task-comments-list">
            {comments.length === 0 ? (
              <p className="empty-text">No comments yet.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id || comment.id} className="task-comment-item">
                  <div className="task-comment-meta">
                    <strong>{comment.user?.name || "Unknown"}</strong>
                    <span>{comment.createdAt ? new Date(comment.createdAt).toLocaleString() : "Just now"}</span>
                  </div>
                  <p>{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
