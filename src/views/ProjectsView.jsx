import "./ProjectsView.css";
import Sidebar from "../components/Sidebar.jsx";
import ProjectList from "../components/ProjectList.jsx";
import DocumentationViewer from "./DocumentationViewer.jsx";
import TasksViewer from "./TasksViewer.jsx";
import Swal from "sweetalert2";
import { useState } from "react";

export default function ProjectsView({
  projects,
  activeProject,
  selectProject,
  deleteProject,
  addProject,
  toggleProjectStatus,
  saveDoc,
  addTask,
  toggleStatus,
  deleteTask,
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = search
      ? p.title.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesStatus = filterStatus ? p.status === filterStatus : true;
    const matchesPriority = filterPriority
      ? p.priority === filterPriority
      : true;
    const matchesDate = filterDate ? p.deadline === filterDate : true;

    return matchesSearch && matchesStatus && matchesPriority && matchesDate;
  });

  const clearFilters = () => {
    setSearch("");
    setFilterStatus("");
    setFilterPriority("");
    setFilterDate("");
  };

  return (
    <div className="row">
      {activeProject === null && (
        <>
          <div className="row mb-3 align-items-stretch">
            <div className="col-md-6 d-flex">
              <div className="card shadow-sm flex-fill h-100">
                <Sidebar addProject={addProject} />
              </div>
            </div>

            <div className="col-md-6 d-flex">
              <div className="card shadow-sm flex-fill p-3 h-100">
                <h5 className="mb-3">🔎 Buscar proyecto</h5>
                <hr />
                <h6 className="mb-3">
                  Busca un proyecto por su título, estado, prioridad o fecha.
                </h6>
                <hr />

                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Por título..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <select
                  className="form-select mb-2"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">Todos los estados</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="en progreso">En progreso</option>
                  <option value="completado">Completado</option>
                </select>

                <select
                  className="form-select mb-2"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="">Todas las prioridades</option>
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>

                <input
                  type="date"
                  className="form-control mb-2"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />

                <button
                  className="btn btn-secondary w-100 fw-bold mb-2"
                  onClick={clearFilters}
                >
                  ♻️ Limpiar filtros
                </button>

                <button
                  className="btn btn-outline-danger w-100 fw-bold"
                  onClick={() => {
                    const hoy = new Date();
                    const dentroDe7 = new Date();
                    dentroDe7.setDate(hoy.getDate() + 7);

                    const proximos = projects.filter((p) => {
                      if (!p.deadline) return false;
                      const fecha = new Date(p.deadline);
                      return fecha >= hoy && fecha <= dentroDe7;
                    });

                    Swal.fire({
                      title: "⏳ Próximos a vencer",
                      html: proximos.length
                        ? `<ul style="text-align:left; list-style:none; padding:0;">
                             ${proximos
                               .map(
                                 (p) =>
                                   `<li>📌 <b>${
                                     p.title
                                   }</b> - vence el ${new Date(
                                     p.deadline
                                   ).toLocaleDateString("es-AR", {
                                     day: "2-digit",
                                     month: "2-digit",
                                     year: "numeric",
                                   })}</li>`
                               )
                               .join("")}
                           </ul>`
                        : "No hay proyectos que venzan en los próximos 7 días ✅",
                      icon: proximos.length ? "warning" : "info",
                      confirmButtonText: "OK",
                      confirmButtonColor: "#198754",
                    });
                  }}
                >
                  ⏳ Próximos a vencer
                </button>
              </div>
            </div>
          </div>

          <div className="col-12">
            <hr className="project-list-divider" />
            <h3 className="mb-3 text-center project-list-title">
              Lista de proyectos
            </h3>
            <h4 className="mb-3 text-center project-list-subtitle">
              Elige tu proyecto y continua con tus tareas
            </h4>
            <hr className="project-list-divider" />
            <div className="row gx-0">
              <ProjectList
                projects={filteredProjects}
                activeProject={activeProject}
                selectProject={selectProject}
                deleteProject={deleteProject}
                toggleProjectStatus={toggleProjectStatus}
              />
            </div>
          </div>
        </>
      )}

      {activeProject !== null && projects[activeProject] && (
        <div className="col-12">
          <div className="card shadow-sm p-4 mb-4 project-detail-card">
            <div
              className={`project-divider ${
                projects[activeProject].status === "pendiente"
                  ? "divider-pendiente"
                  : projects[activeProject].status === "en progreso"
                  ? "divider-progreso"
                  : "divider-completado"
              }`}
            />

            <h3 className="fw-bold mb-3">{projects[activeProject].title}</h3>

            {projects[activeProject].description && (
              <p className="mb-2">{projects[activeProject].description}</p>
            )}

            {projects[activeProject].deadline && (
              <p className="mb-2">
                📅{" "}
                <strong>
                  {new Date(
                    projects[activeProject].deadline
                  ).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </strong>{" "}
                | 🔥 {projects[activeProject].priority}
              </p>
            )}

            <p className="mt-2">
              Estado:{" "}
              <span
                className={`badge ${
                  projects[activeProject].status === "pendiente"
                    ? "bg-secondary"
                    : projects[activeProject].status === "en progreso"
                    ? "bg-info text-dark"
                    : "bg-success"
                }`}
              >
                {projects[activeProject].status}
              </span>
            </p>
          </div>

          <DocumentationViewer
            docText={projects[activeProject].doc}
            setDocText={(text) => saveDoc(text)}
            saveDoc={() => saveDoc(projects[activeProject].doc)}
            project={projects[activeProject]}
          />

          <TasksViewer
            tasks={projects[activeProject].tasks}
            addTask={addTask}
            toggleStatus={toggleStatus}
            deleteTask={deleteTask}
          />

          <div className="text-center mt-4">
            <button
              className="btn btn-success fw-bold"
              onClick={() => selectProject(null)}
            >
              🔙 Volver a la lista de proyectos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
