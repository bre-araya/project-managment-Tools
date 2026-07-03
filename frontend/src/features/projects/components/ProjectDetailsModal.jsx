import { useState } from "react";
import "../styles/project-modal.css";

function ProjectDetailsModal({ project, onClose, onInviteMember }) {
  const [invite, setInvite] = useState({ email: "", role: "developer" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!invite.email.trim()) {
      setError("Enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await onInviteMember(project._id || project.id, { email: invite.email.trim(), role: invite.role });
      setMessage("Invite sent successfully.");
      setInvite({ email: "", role: "developer" });
    } catch (err) {
      setError(err?.response?.data?.message || "Invite failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box project-details-modal">
        <div className="modal-header">
          <h2>Project details</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="project-details-content">
          <div className="project-details-header">
            <h3>{project.name}</h3>
            <p>{project.description || "No description available."}</p>
          </div>

          <div className="project-details-grid">
            <div>
              <strong>Status</strong>
              <p>{project.status || "To Do"}</p>
            </div>
            <div>
              <strong>Progress</strong>
              <p>{Math.round(project.progress || 0)}%</p>
            </div>
            <div>
              <strong>Deadline</strong>
              <p>{project.deadline ? new Date(project.deadline).toLocaleDateString() : "None"}</p>
            </div>
          </div>

          <div className="project-members-section">
            <strong>Team members</strong>
            <ul className="project-members-list">
              {project.members?.map((member) => (
                <li key={member.user?._id || member.user?.id || member.user}>
                  <span>{member.user?.name || member.user?.email || "Unknown"}</span>
                  <small>{member.role}</small>
                </li>
              ))}
            </ul>
          </div>

          <form className="project-details-invite" onSubmit={handleInviteSubmit}>
            <h4>Invite a team member</h4>
            <label>
              Email
              <input
                type="email"
                value={invite.email}
                onChange={(e) => setInvite((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </label>
            <label>
              Role
              <select
                value={invite.role}
                onChange={(e) => setInvite((prev) => ({ ...prev, role: e.target.value }))}
              >
                <option value="developer">Developer</option>
                <option value="viewer">Viewer</option>
                <option value="project-manager">Project Manager</option>
              </select>
            </label>

            {message ? <div className="login__success">{message}</div> : null}
            {error ? <div className="login__error">{error}</div> : null}

            <button type="submit" disabled={loading}>
              {loading ? "Inviting..." : "Send invite"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsModal;
