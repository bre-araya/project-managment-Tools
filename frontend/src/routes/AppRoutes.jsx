import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RequireAuth from "../pages/RequireAuth";

import DashboardPage from "../pages/DashboardPage";
import ProjectsPage from "../features/projects/pages/ProjectsPage";
import TasksPage from "../features/tasks/pages/TasksPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />

        <Route
          path="/projects"
          element={
            <RequireAuth>
              <ProjectsPage />
            </RequireAuth>
          }
        />

        <Route
          path="/tasks"
          element={
            <RequireAuth>
              <TasksPage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

