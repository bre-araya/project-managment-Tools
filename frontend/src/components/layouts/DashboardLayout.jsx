import "./dashboard-layout.css";

import Sidebar from "./Sidebar";
import Header from "./Header";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Header />

        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;