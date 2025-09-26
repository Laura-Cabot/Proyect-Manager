import { useState, useEffect } from "react";
import DocumentationViewer from "../views/DocumentationViewer.jsx";
import "./GlobalDocumentation.css";
import Swal from "sweetalert2";

export default function GlobalDocumentation() {
  const [activeTab, setActiveTab] = useState("notes");

  const [notes, setNotes] = useState(
    "# Notas generales 📚\n\nAquí puedes escribir lo que quieras..."
  );
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem("globalNotes");
    if (savedNotes) setNotes(savedNotes);

    const savedFiles = localStorage.getItem("globalFiles");
    if (savedFiles) setFiles(JSON.parse(savedFiles));

    const savedLinks = localStorage.getItem("globalLinks");
    if (savedLinks) setLinks(JSON.parse(savedLinks));
  }, []);

  useEffect(() => {
    localStorage.setItem("globalNotes", notes);
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("globalFiles", JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    localStorage.setItem("globalLinks", JSON.stringify(links));
  }, [links]);

  const addFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFiles([...files, { name: file.name, dataUrl: reader.result }]);
    };
    reader.readAsDataURL(file);
  };

  const deleteFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const addLink = () => {
    if (newLink.trim() === "") return;
    setLinks([...links, newLink]);
    setNewLink("");
  };

  const deleteLink = (index) => {
    const updated = [...links];
    updated.splice(index, 1);
    setLinks(updated);
  };

  return (
    <div>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "notes" ? "active" : ""}`}
            onClick={() => setActiveTab("notes")}
          >
            📝 Notas
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "files" ? "active" : ""}`}
            onClick={() => setActiveTab("files")}
          >
            📂 Archivos
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "links" ? "active" : ""}`}
            onClick={() => setActiveTab("links")}
          >
            🔗 Enlaces
          </button>
        </li>
      </ul>

      {activeTab === "notes" && (
        <div className="notes-wra">
          <DocumentationViewer
            docText={notes}
            setDocText={setNotes}
            saveDoc={() => {
              Swal.fire({
                icon: "success",
                title: "📚 Notas guardadas",
                text: "Tus notas generales se guardaron correctamente ✅",
                confirmButtonColor: "#198754",
                timer: 2000,
                showConfirmButton: false,
              });
            }}
            project={{ name: "Notas Generales", doc: notes }}
          />
        </div>
      )}

      {activeTab === "files" && (
        <div>
          <h5>📂 Archivos subidos</h5>
          <input type="file" className="form-control mb-2" onChange={addFile} />
          <ul className="list-group">
            {files.map((file, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <a
                  href={file.dataUrl}
                  download={file.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.name}
                </a>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteFile(index)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "links" && (
        <div>
          <h5>🔗 Enlaces guardados</h5>
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Pega un enlace aquí..."
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
            />
            <button className="btn btn-success" onClick={addLink}>
              Agregar
            </button>
          </div>
          <ul className="list-group">
            {links.map((link, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteLink(index)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
