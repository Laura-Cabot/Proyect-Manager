import ProjectForm from "./ProjectForm.jsx";

export default function Sidebar({ addProject }) {
  return (
    <>
      <h5 className="mb-3">📋 Nuevo proyecto</h5>
     
      <hr />
      <div className="mb-3">
        <ProjectForm addProject={addProject} />
      </div>
    </>
  );
}
