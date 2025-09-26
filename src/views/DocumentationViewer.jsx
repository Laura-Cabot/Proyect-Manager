import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";
import Swal from "sweetalert2";

function DocumentationViewer({ docText, setDocText, saveDoc, project }) {
  const [isEditing, setIsEditing] = useState(false);

  if (!project) {
    return (
      <div className="text-center mt-5">
        <h6>Selecciona un proyecto para ver o agregar documentación</h6>
      </div>
    );
  }

  const handleSave = () => {
    saveDoc(docText);
    setIsEditing(false);

    Swal.fire({
      icon: "success",
      title: "📚 Documentación guardada",
      text: "Tu documentación se guardó correctamente ✅",
      confirmButtonColor: "#198754",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div>
      <h5>📝 Documentación de {project.name}</h5>

      {isEditing ? (
        <>
          <textarea
            className="form-control mb-2"
            rows="6"
            value={docText}
            onChange={(e) => setDocText(e.target.value)}
            placeholder="Escribí con formato Markdown aquí..."
          />

          <input
            type="file"
            accept=".pdf,.docx,.png,.jpg,.jpeg,.gif"
            className="form-control mb-2"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setDocText(docText + `\n[${file.name}](${url})`);
              }
            }}
          />

          <button className="btn btn-success me-2" onClick={handleSave}>
            Guardar
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setIsEditing(false)}
          >
            Cancelar
          </button>
        </>
      ) : (
        <div className="card p-3 mb-3">
          <ReactMarkdown
            remarkPlugins={[
              remarkGfm,
              remarkSlug,
              [remarkToc, { heading: "Índice" }],
            ]}
          >
            {project.doc || "_Sin documentación aún..._"}
          </ReactMarkdown>
          <button
            className="btn btn-outline-primary mt-2"
            onClick={() => setIsEditing(true)}
          >
            Editar documentación
          </button>
        </div>
      )}
    </div>
  );
}

export default DocumentationViewer;
