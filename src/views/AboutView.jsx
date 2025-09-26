import "./AboutView.css";

export default function AboutView() {
  return (
    <div className="card shadow-sm p-4 about-card">
      <h2 className="text-center mb-4 fw-bold">
        Project Manager: tu espacio de organización total
      </h2>
      <p className="lead text-muted fw-semibold text-center">
        Project Manager no es solo una app: es un recurso versátil para
        organizar, documentar y dar seguimiento a cualquier tipo de proyecto.
      </p>
      <hr />
      <ul className="list-unstyled fs-5">
        <li>📋 Crear, editar y gestionar proyectos de manera simple.</li>
        <li>📝 Documentar ideas y notas con un editor integrado.</li>
        <li>🔗 Guardar y acceder rápidamente a enlaces importantes.</li>
        <li>📂 Subir y descargar archivos asociados a tus proyectos.</li>
        <li>📊 Organizar tareas con estados y prioridades personalizadas.</li>
        <li>♻️ Exportar e importar información para usarla donde quieras.</li>
      </ul>
      <hr />
      <p className="text-center fw-bold fs-5 text-success">
        Una herramienta flexible para infinitos temas: estudios, trabajo,
        investigación o cualquier idea que quieras llevar adelante.
      </p>
    </div>
  );
}
