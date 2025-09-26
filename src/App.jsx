import { useState, useEffect } from "react";
import Portada from "./components/Portada.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Swal from "sweetalert2";
import "./App-Backup.css";
import ProjectsView from "./views/ProjectsView.jsx";
import AboutView from "./views/AboutView.jsx";
import GlobalDocumentation from "./components/GlobalDocumentation.jsx";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

 useEffect(() => {
  try {
    const saved = localStorage.getItem("projects");
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      const backup = localStorage.getItem("projects-backup");
      if (backup) {
        setProjects(JSON.parse(backup));
      } else {
        // 👉 Cargar desde /backup.json
        fetch("/backup.json")
          .then((res) => res.json())
          .then((data) => {
            setProjects(data);
            localStorage.setItem("projects", JSON.stringify(data));
            localStorage.setItem("projects-backup", JSON.stringify(data));
          })
          .catch((err) =>
            console.error("❌ Error cargando backup.json:", err)
          );
      }
    }
  } catch (err) {
    console.error("❌ Error leyendo localStorage:", err);
    setProjects([]); // fallback vacío
  }
}, []);


  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem("projects", JSON.stringify(projects));
      localStorage.setItem("projects-backup", JSON.stringify(projects));
    }
  }, [projects]);

  const plantillaDoc = `# Documentación 🚀\n\nDescribe aquí el proyecto...`;

  const addProject = ({ title, description, deadline, priority }) => {
    setProjects((prev) => [
      ...prev,
      {
        title,
        description,
        deadline,
        priority,
        createdAt: new Date().toISOString(),
        doc: plantillaDoc,
        tasks: [],
        status: "pendiente",
      },
    ]);

    Swal.fire({
      icon: "success",
      title: "Proyecto creado",
      text: "Tu proyecto fue creado con éxito 🎉",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const toggleProjectStatus = (index) => {
    setProjects((prev) => {
      const updated = [...prev];
      const p = updated[index];
      if (!p) return prev;
      if (p.status === "pendiente") p.status = "en progreso";
      else if (p.status === "en progreso") p.status = "completado";
      else p.status = "pendiente";
      return updated;
    });
  };

  const selectProject = (index) => {
    setActiveProject((prev) => (prev === index ? null : index));
  };

  const saveDoc = (newDoc) => {
    if (activeProject === null) return;
    setProjects((prev) => {
      const updated = [...prev];
      updated[activeProject] = { ...updated[activeProject], doc: newDoc };
      return updated;
    });
  };

  const deleteProject = (index) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Este proyecto y sus tareas se eliminarán",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setProjects((prev) => {
          const updated = [...prev];
          updated.splice(index, 1);
          return updated;
        });
        if (activeProject === index) setActiveProject(null);

        Swal.fire("Eliminado", "El proyecto fue eliminado con éxito", "success");
      }
    });
  };

  const addTask = (task) => {
    if (activeProject === null) return;
    setProjects((prev) => {
      const updated = [...prev];
      updated[activeProject].tasks.push(task);
      return updated;
    });

    Swal.fire({
      icon: "success",
      title: "Tarea creada",
      text: "Tu tarea fue agregada con éxito ✅",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const toggleStatus = (taskIndex) => {
    if (activeProject === null) return;
    setProjects((prev) => {
      const updated = [...prev];
      const task = updated[activeProject].tasks[taskIndex];
      if (!task) return prev;
      if (task.status === "pendiente") task.status = "en progreso";
      else if (task.status === "en progreso") task.status = "completado";
      else task.status = "pendiente";
      return updated;
    });
  };

  const deleteTask = (taskIndex) => {
    if (activeProject === null) return;

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta tarea se eliminará definitivamente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setProjects((prev) => {
          const updated = [...prev];
          updated[activeProject].tasks.splice(taskIndex, 1);
          return updated;
        });

        Swal.fire("Eliminada", "La tarea fue eliminada con éxito", "success");
      }
    });
  };

  // 📤 Exportar proyectos
  const exportProjects = () => {
    try {
      const data = JSON.stringify(projects, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "backup.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("❌ Error exportando proyectos:", err);
    }
  };

  // 📥 Importar proyectos
  const importProjects = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          setProjects(imported);
          Swal.fire({
            icon: "success",
            title: "Importado",
            text: "Tus proyectos fueron importados 🎉",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire("Error", "El archivo no contiene proyectos válidos", "error");
        }
      } catch (err) {
        Swal.fire("Error", "No se pudo leer el archivo", "error");
        console.error("❌ Error importando proyectos:", err);
      }
    };
    reader.readAsText(file);
  };

  const q = (search || "").toLowerCase();
  const fStatus = filterStatus || "";
  const fPriority = (filterPriority || "").toString().toLowerCase();

  const projectsFiltered = projects
    .map((p, i) => ({ ...p, __origIndex: i }))
    .filter((p) => {
      const title = (p.title || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      const matchesSearch = !q || title.includes(q) || desc.includes(q);
      const matchesStatus = !fStatus || p.status === fStatus;
      const prio = (p.priority || "").toString().toLowerCase();
      const matchesPriority = !fPriority || prio === fPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    });

  if (!isLogged) {
    return <Portada onLogin={() => setIsLogged(true)} />;
  }

  return (
    <>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        exportProjects={exportProjects}
        importProjects={importProjects}
      />

      {activeTab === "home" && (
        <Portada onLogin={() => setActiveTab("projects")} />
      )}

      {activeTab !== "home" && (
        <div className="container my-4">
          {activeTab === "projects" && (
            <ProjectsView
              projects={projects}
              projectsFiltered={projectsFiltered}
              activeProject={activeProject}
              selectProject={selectProject}
              deleteProject={deleteProject}
              addProject={addProject}
              toggleProjectStatus={toggleProjectStatus}
              saveDoc={saveDoc}
              addTask={addTask}
              toggleStatus={toggleStatus}
              deleteTask={deleteTask}
              search={search}
              setSearch={setSearch}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterPriority={filterPriority}
              setFilterPriority={setFilterPriority}
            />
          )}

          {activeTab === "documentation" && <GlobalDocumentation />}
          {activeTab === "about" && <AboutView />}
        </div>
      )}

      <Footer />
    </>
  );
}

export default App;
