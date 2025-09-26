import "./ProjectList.css";

export default function ProjectList({
  projects,
  activeProject,
  selectProject,
  deleteProject,
  toggleProjectStatus,
}) {
  const hoy = new Date();
  const dentroDe7 = new Date();
  dentroDe7.setDate(hoy.getDate() + 7);

  return (
    <div className="row">
      {projects.map((project, index) => {
        const estaPorVencer =
          project.deadline &&
          new Date(project.deadline) >= hoy &&
          new Date(project.deadline) <= dentroDe7;

        return (
          <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">
            <div
              className={`card project-card shadow-sm h-100 ${
                activeProject === index ? "border-primary border-3" : ""
              } ${estaPorVencer ? "por-vencer" : ""}`}
              onClick={() => selectProject(index)}
            >
              <div
                className={`project-divider ${
                  project.status === "pendiente"
                    ? "divider-pendiente"
                    : project.status === "en progreso"
                    ? "divider-progreso"
                    : "divider-completado"
                }`}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title project-title">
                  {project.title || "Sin título"}
                </h5>

                <div className="mb-2">
                  {project.deadline && (
                    <p className="project-date">
                      ⏳Vencimiento:{" "}
                      {new Date(project.deadline).toLocaleDateString("es-AR")}
                    </p>
                  )}
                </div>

                {project.description && (
                  <p className="project-desc">{project.description}</p>
                )}

                <div className="project-footer mt-auto d-flex justify-content-between align-items-center">
                  {project.priority && (
                    <span
                      className={`priority-badge ${
                        project.priority === "alta"
                          ? "border border-danger text-danger bg-light"
                          : project.priority === "media"
                          ? "border border-warning text-warning"
                          : "border border-secondary text-secondary"
                      }`}
                    >
                      {project.priority}
                    </span>
                  )}

                  <div className="d-flex gap-2">
                    <button
                      className={`btn btn-sm ${
                        project.status === "pendiente"
                          ? "btn-secondary"
                          : project.status === "en progreso"
                          ? "btn-info text-dark"
                          : "btn-success"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleProjectStatus(index);
                      }}
                    >
                      {project.status === "pendiente" && "⏳ Pendiente"}
                      {project.status === "en progreso" && "🚧 En progreso"}
                      {project.status === "completado" && "✔️ Completado"}
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(index);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {projects.length === 0 && (
        <p className="text-center mt-4 fw-bold fs-5 text-danger">
          🚫 No se encontraron proyectos
        </p>
      )}
    </div>
  );
}
