import { NavLink } from "react-router-dom";// NavLink is like a normal link (<a>), but it knows which page is currently active.
import { useState, useEffect, useCallback } from "react";
import "./dashboard-layout.css";

function Sidebar() {
  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Tasks",
      path: "/tasks",
    },
  ];
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileHidden, setMobileHidden] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sidebarCollapsed");
      if (saved !== null) setCollapsed(JSON.parse(saved));
    } catch (error) {
      // ignore
    }
  }, []);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.matchMedia("(max-width: 992px)").matches;
      setIsMobile(mobile);
      // when switching to desktop, ensure mobileHidden is false
      if (!mobile) setMobileHidden(false);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
    } catch (e) {
      // ignore
    }
  }, [collapsed]);

  const handleToggle = useCallback(() => setCollapsed((s) => !s), []);

  const handleToggleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  const handleMenuClick = (menu) => {
    // Ensure Projects and Tasks show the sidebar (same as Dashboard)
    if (menu.name === "Projects" || menu.name === "Tasks") {
      if (isMobile) {
        setMobileHidden(false);
        setCollapsed(false);
      } else {
        setCollapsed(false);
      }
      return;
    }
    // default behavior: do nothing (keep user's current sidebar state)
  };

  return (
    <>
      {collapsed && (
        <button
          type="button"
          className="sidebar-open-toggle"
          aria-label="Expand sidebar"
          onClick={handleToggle}
          onKeyDown={handleToggleKey}
        >
          <span className="toggle-icon" aria-hidden>
            ☰
          </span>
        </button>
      )}

      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileHidden ? "mobile-hidden" : ""}`}
        aria-expanded={!collapsed}
      >
        <div className="sidebar-header">
          <div className="logo" title="ProManage">ProManage</div>

          <button
            type="button"
            className="sidebar-toggle"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={collapsed}
            onClick={handleToggle}
            onKeyDown={handleToggleKey}
          >
            <span className="toggle-icon" aria-hidden>
              {collapsed ? "☰" : "✕"}
            </span>
          </button>
        </div>

        <nav className="sidebar-menu">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              title={menu.name}
              onClick={() => handleMenuClick(menu)}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <span className="menu-label">{menu.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* mobile toggle button shown when sidebar is hidden on small screens */}
      {isMobile && mobileHidden && (
        <button
          className="mobile-sidebar-toggle"
          aria-label="Open sidebar"
          onClick={() => setMobileHidden(false)}
        >
          ☰
        </button>
      )}
    </>
  );
}

export default Sidebar;