export default function Filters({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
}) {
  return (
    <div className="card p-3 shadow-sm mb-3">
      <h5 className="mb-3">🔎 Buscar proyecto</h5>
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
        className="form-select"
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
      >
        <option value="">Todas las prioridades</option>
        <option value="Alta">Alta</option>
        <option value="Media">Media</option>
        <option value="Baja">Baja</option>
      </select>
    </div>
  );
}
