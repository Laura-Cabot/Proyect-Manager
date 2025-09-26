export default function TaskList({ tasks, toggleStatus, deleteTask }) {
  if (!tasks || tasks.length === 0) {
    return <p className="text-muted">No hay subtareas aún.</p>;
  }

  return (
    <ul className="list-group">
      {tasks.map((task, index) => (
        <li
          key={index}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {/* Título */}
          <span
            style={{
              fontWeight: "500",
              textDecoration:
                task.status === "completado" ?  "line-through" : "none",
              color: task.status === "completado" ? "green" : "inherit",
            }}
          >
            {task.title}
          </span>

          {/* Acciones (status + eliminar) */}
          <div className="d-flex align-items-center gap-2">
            <span
              className={`badge p-2 ${
                task.status === "pendiente"
                  ? "bg-secondary"
                  : task.status === "en progreso"
                  ? "bg-info"
                  : "bg-success"
              }`}
              style={{
                cursor: "pointer",
                fontSize: "0.9rem",
                minWidth: "120px",
                textAlign: "center",
              }}
              onClick={() => toggleStatus(index)}
            >
              {task.status === "pendiente" && "⏳ Pendiente"}
              {task.status === "en progreso" && "🚧 En progreso"}
              {task.status === "completado" && "✔️ Completado"}
            </span>

            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => deleteTask(index)}
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
