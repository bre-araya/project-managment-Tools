import {BrowserRouter,  Routes,  Route,} from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import ProjectsPage from "../features/projects/pages/ProjectsPage";
import TasksPage from "../features/tasks/pages/TasksPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;