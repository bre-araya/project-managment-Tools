// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import ProjectCard from "../components/ui/ProjectCard";
import api from "../services/api";
import "../styles/pages/dashboard-page.css";

function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    { title: "Projects", value: 0, icon: "📁" },
    { title: "Tasks", value: 0, icon: "✅" },
    { title: "Completed", value: 0, icon: "🎯" },
    { title: "Pending", value: 0, icon: "⏳" },
  ]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storedUser = typeof window !== "undefined" ? localStorage.getItem("pm_user") : null;
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userName = user?.name?.split(" ")[0] || "there";

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError("");

      try {
        const projectsRes = await api.get("/api/projects");
        const projectsData = projectsRes.data || [];

        const projectSummaries = await Promise.all(
          projectsData.map(async (project) => {
            try {
              const tasksRes = await api.get(`/api/tasks/project/${project._id || project.id}`);
              const tasks = tasksRes.data || [];
              const normalizedTasks = tasks.map((task) => task.status?.toString().trim().toLowerCase());
              const doneCount = normalizedTasks.filter((status) => status === "done" || status === "completed").length;
              const totalCount = tasks.length;
              const progress = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

              const storedProgress = Number.isFinite(Number(project.progress)) ? Number(project.progress) : progress;

              return {
                ...project,
                taskCount: totalCount,
                completedCount: doneCount,
                pendingCount: totalCount - doneCount,
                progress: storedProgress,
                deadline: project.deadline
                  ? new Date(project.deadline).toLocaleDateString()
                  : project.updatedAt
                  ? new Date(project.updatedAt).toLocaleDateString()
                  : "No deadline",
              };
            } catch (err) {
              console.error("Failed to load tasks for project", project._id || project.id, err);
              return {
                ...project,
                taskCount: 0,
                completedCount: 0,
                pendingCount: 0,
                progress: 0,
                deadline: project.deadline
                  ? new Date(project.deadline).toLocaleDateString()
                  : project.updatedAt
                  ? new Date(project.updatedAt).toLocaleDateString()
                  : "No deadline",
              };
            }
          })
        );

        const totalTasks = projectSummaries.reduce((sum, item) => sum + item.taskCount, 0);
        const totalCompleted = projectSummaries.reduce((sum, item) => sum + item.completedCount, 0);
        const totalPending = projectSummaries.reduce((sum, item) => sum + item.pendingCount, 0);

        setProjects(projectSummaries);
        setStats([
          { title: "Projects", value: projectSummaries.length, icon: "📁" },
          { title: "Tasks", value: totalTasks, icon: "✅" },
          { title: "Completed", value: totalCompleted, icon: "🎯" },
          { title: "Pending", value: totalPending, icon: "⏳" },
        ]);
      } catch (err) {
        console.error("Failed to load dashboard data", err);

        if (err?.response?.status === 401) {
          localStorage.removeItem("pm_token");
          localStorage.removeItem("pm_user");
          navigate("/login", { replace: true });
          return;
        }

        setError("We couldn't load your workspace right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <DashboardLayout>
      <section className="dashboard-hero">
        <div className="hero-copy">
          <p className="hero-eyebrow">Workspace overview</p>
          <h1>Welcome back, {userName}</h1>
          <p className="hero-text">
            Keep your team aligned with a polished workspace for projects, tasks, and progress.
          </p>

          <div className="hero-actions">
            <button type="button" className="btn-primary" onClick={() => navigate("/projects")}>Create project</button>
            <button type="button" className="btn-secondary" onClick={() => navigate("/tasks")}>View tasks</button>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-row">
            <span>Active projects</span>
            <strong>{stats[0].value}</strong>
          </div>
          <div className="hero-card-row">
            <span>Open tasks</span>
            <strong>{stats[3].value}</strong>
          </div>
          <div className="hero-card-row">
            <span>Completed</span>
            <strong>{stats[2].value}</strong>
          </div>
        </div>
      </section>

      {error ? <div className="dashboard-error">{error}</div> : null}

      <div className="dashboard-grid">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      <div className="section">
        <div className="section-header">
          <h2>Recent Projects</h2>
          <button type="button" className="text-link" onClick={() => navigate("/projects")}>Manage all</button>
        </div>

        {loading ? (
          <p className="empty-text">Loading dashboard data...</p>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <h3>Start your first project</h3>
            <p>Create a project to organize tasks, deadlines, and your team in one place.</p>
            <button type="button" className="btn-primary" onClick={() => navigate("/projects")}>Create your first project</button>
          </div>
        ) : (
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project._id || project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;