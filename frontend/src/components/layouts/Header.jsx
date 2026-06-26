import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const route = pathname.startsWith("/projects")
    ? "projects"
    : pathname.startsWith("/tasks")
    ? "tasks"
    : pathname === "/" || pathname.startsWith("/dashboard")
    ? "dashboard"
    : "dashboard";

  const headerMap = {
    dashboard: {
      title: "Dashboard",
      subtitle: "Manage your projects efficiently",
      action: "New Project",
    },
    projects: {
      title: "Projects",
      subtitle: "Manage your projects and boards",
      action: "+ New Project",
    },
    tasks: {
      title: "Tasks Board",
      subtitle: "Manage your team tasks efficiently",
      action: "Create Task",
    },
  };

  const { title, subtitle, action } = headerMap[route] || headerMap.dashboard;

  const handleActionClick = () => {
    if (route === "projects") {
      navigate("/projects?modal=new");
    } else if (route === "tasks") {
      navigate("/tasks?modal=new");
    } else {
      navigate("/projects?modal=new");
    }
  };

  return (
    <header className="header">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="header-actions">
        <input type="text" placeholder="Search..." />

        <button type="button" onClick={handleActionClick}>{action}</button>
      </div>
    </header>
  );
}

export default Header;