import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    addTask({ title: task.trim(), status: "pendiente" });
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3 d-flex">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Nueva tarea..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="btn btn-success" type="submit">
        Agregar
      </button>
    </form>
  );
}
