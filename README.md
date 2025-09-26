# 📋 Gestor de Proyectos

Aplicación web para organizar proyectos, tareas y documentación.  
Construida con **React + Vite** y persistencia en **localStorage**.

---

## 🚀 Funcionalidades principales
- Crear proyectos con título, descripción, fecha de vencimiento y prioridad.
- Subtareas con estados: Pendiente, En progreso, Completado.
- Cambiar estado de proyectos y tareas con un solo clic.
- Filtros por estado, prioridad, fecha o búsqueda por título.
- Destacado automático de proyectos próximos a vencer.
- Documentación por proyecto con soporte Markdown.
- Documentación global con notas generales, archivos y enlaces.
- Persistencia en `localStorage` (los datos no se pierden al recargar).
- Interfaz clara y adaptable con **Bootstrap** + estilos personalizados.

---

## 🛠️ Tecnologías
- React + Vite  
- Bootstrap 5  
- SweetAlert2  
- React Markdown (con GFM)  
- LocalStorage API  

---

## 📂 Estructura principal
- `src/components/` → componentes como Sidebar, Navbar, TaskList, etc.  
- `src/views/` → vistas principales (ProjectsView, AboutView, DocumentationViewer).  
- `src/assets/` → íconos y favicon personalizado.  

---

## 📸 Capturas
*(Opcional: podés agregar capturas de pantalla cuando deployes en Netlify)*

---

## 📦 Instalación
Clonar el repositorio e instalar dependencias:
```bash
git clone https://github.com/usuario/repositorio.git
cd repositorio
npm install
npm run dev

npm run build

👩‍💻 Autor

Desarrollado por María Laura Cabot
(Proyecto de práctica / prueba técnica en React)

