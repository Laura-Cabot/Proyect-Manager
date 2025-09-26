import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";

export default function TasksViewer({ tasks, addTask, toggleStatus, deleteTask }) {
  return (
    <div className="mt-4">
      <h5 className="mb-3">✅ Tareas</h5>

      <TaskForm addTask={addTask} />

      <TaskList
        tasks={tasks}
        toggleStatus={toggleStatus}
        deleteTask={deleteTask}
      />
    </div>
  );
}

