import { useState } from "react";
import ProjectForm from "./ProjectForm";
import "./../styles/project-modal.css";

function ProjectModal({ onClose, onSubmit }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data) => {
    setLoading(true);
    
    setTimeout(() => {
      onSubmit(data); // ✅ send data to parent
      setLoading(false);
    }, 500);
    setTimeout(() => {
      console.log("Project Created:", data);
      setLoading(false);
      onClose();
    }, 800);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h2>Create Project</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <ProjectForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}

export default ProjectModal;