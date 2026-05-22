function Header() {
  return (
    <header className="header">
      <div>
        <h2>Dashboard</h2>
        <p>Manage your projects efficiently</p>
      </div>

      <div className="header-actions">
        <input
          type="text"
          placeholder="Search..."
        />

        <button>
          New Project
        </button>
      </div>
    </header>
  );
}

export default Header;