import { NavLink } from "react-router-dom";

function Sidebar() {
  const menus = [
    {
      name: "Dashboard",
      path: "/",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Tasks",
      path: "/tasks",
    },
    {
      name: "Teams",
      path: "/teams",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        ProManage
      </div>

      <nav className="sidebar-menu">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
          >
            {menu.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;