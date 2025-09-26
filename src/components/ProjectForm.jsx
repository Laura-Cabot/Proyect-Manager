import { useState } from "react";
import "./ProjectForm.css";

export default function ProjectForm({ addProject }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("media");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProject = {
      title,
      description,
      createdAt,
      deadline,
      priority,
      status: "pendiente",
      tasks: [],
      doc: "",
    };

    addProject(newProject);

    setTitle("");
    setDescription("");
    setCreatedAt("");
    setDeadline("");
    setPriority("media");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        style={{ maxHeight: "100px", overflowY: "auto" }}
      />

      <label className="form-label">📅 Fecha de creación</label>
      <input
        type="date"
        className="form-control mb-2"
        value={createdAt}
        onChange={(e) => setCreatedAt(e.target.value)}
      />

      <label className="form-label">⏳ Fecha de vencimiento</label>
      <input
        type="date"
        className="form-control mb-2"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <label className="form-label">🔥 Prioridad</label>
      <select
        className="form-select mb-2"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>

      <button
        type="submit"
        className="btn btn-outline-success w-100 fw-bold add-project-btn"
      >
        ➕ Agregar proyecto
      </button>
    </form>
  );
}
