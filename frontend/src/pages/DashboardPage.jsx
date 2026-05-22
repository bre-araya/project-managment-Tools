// src/pages/DashboardPage.jsx
import DashboardLayout from "../components/layouts/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import ProjectCard from "../components/ui/ProjectCard";
import "../styles/pages/dashboard-page.css";

function DashboardPage() {
  const stats = [
    { title: "Projects", value: 12, icon: "📁" },
    { title: "Tasks", value: 48, icon: "✅" },
    { title: "Teams", value: 6, icon: "👥" },
    { title: "Pending", value: 9, icon: "⏳" },
  ];

  const projects = [
    { name: "Website Redesign", progress: 70, deadline: "June 10" },
    { name: "Mobile App", progress: 40, deadline: "June 20" },
    { name: "CRM System", progress: 90, deadline: "May 28" },
  ];

  return (
    <DashboardLayout>
      <div className="dashboard-grid">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      <div className="section">
        <h2>Active Projects</h2>

        <div className="project-grid">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;