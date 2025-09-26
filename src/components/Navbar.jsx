function Navbar({ activeTab, setActiveTab, exportProjects, importProjects }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <button
        className="navbar-brand btn btn-link text-light text-decoration-none"
        onClick={() => setActiveTab("home")}
      >
        Project Manager
      </button>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <button
              className={`nav-link btn btn-link ${activeTab === "projects" ? "active fw-bold" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              Proyectos
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link btn btn-link ${activeTab === "documentation" ? "active fw-bold" : ""}`}
              onClick={() => setActiveTab("documentation")}
            >
              Documentación
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link btn btn-link ${activeTab === "about" ? "active fw-bold" : ""}`}
              onClick={() => setActiveTab("about")}
            >
              Acerca de
            </button>
          </li>
        </ul>

        <div className="d-flex">
          <button
            className="btn btn-outline-light me-2"
            onClick={exportProjects}
          >
            📤 Exportar
          </button>
          <label className="btn btn-outline-light mb-0">
            📥 Importar
            <input
              type="file"
              accept="application/json"
              onChange={importProjects}
              hidden
            />
          </label>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
