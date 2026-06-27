import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import RequireAuth from "../pages/RequireAuth";

import DashboardPage from "../pages/DashboardPage";
import ProjectsPage from "../features/projects/pages/ProjectsPage";
import TasksPage from "../features/tasks/pages/TasksPage";
import DashboardLayout from "../components/layouts/DashboardLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

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
              <DashboardLayout>
                <ProjectsPage />
              </DashboardLayout>
            </RequireAuth>
          }
        />

        <Route
          path="/tasks"
          element={
            <RequireAuth>
              <DashboardLayout>
                <TasksPage />
              </DashboardLayout>
            </RequireAuth>
          }
        />

        <Route
          path="/tasks/:projectId"
          element={
            <RequireAuth>
              <DashboardLayout>
                <TasksPage />
              </DashboardLayout>
            </RequireAuth>
          }
        />

        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

