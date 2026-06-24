import { useState } from "react";
import ProjectForm from "./ProjectForm";
import "./../styles/project-modal.css";

function ProjectModal({ onClose, onSubmit, initial }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      await onSubmit(data);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h2>{initial ? "Edit Project" : "Create Project"}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <ProjectForm onSubmit={handleSubmit} loading={loading} initial={initial} />
      </div>
    </div>
  );
}

export default ProjectModal;