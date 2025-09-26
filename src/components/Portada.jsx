import "./Portada.css";

export default function Portada({ onLogin, onBackToProjects }) {
  return (
    <div className="portada">
      <video autoPlay muted loop playsInline className="video-bg">
        <source src="/portal.mp4" type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>

      <div className="contenido">
        <h1>Bienvenido a Project Manager</h1>
        <p>Gestión de proyectos y tareas</p>

        {onLogin && (
          <button className="btn-futurista" onClick={onLogin}>
            Ingresar
          </button>
        )}

        {onBackToProjects && (
          <button className="btn-futurista" onClick={onBackToProjects}>
            Volver al tablero
          </button>
        )}
      </div>
    </div>
  );
}
