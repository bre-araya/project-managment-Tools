// src/components/ui/ProgressBar.jsx
import "../../styles/components/progress-bar.css";

function ProgressBar({ value }) {
  return (
    <div className="progress-bar">
      <div style={{ width: `${value}%` }} />
    </div>
  );
}

export default ProgressBar;