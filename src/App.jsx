import { useEffect, useState } from "react";
import { crearContacto, eliminarContactoPorId, listarContactos } from "./api.js";
import ContactoCard from "./components/ContactoCard.jsx";
import FormularioContacto from "./components/FormularioContacto.jsx";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [operacionEnCurso, setOperacionEnCurso] = useState(false);
  const [idEliminando, setIdEliminando] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarContactos() {
      try {
        setContactos(await listarContactos());
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    cargarContactos();
  }, []);

  async function agregarContacto(contacto) {
    try {
      setError("");
      setOperacionEnCurso(true);
      const creado = await crearContacto(contacto);
      setContactos((prev) => [...prev, creado]);
    } catch (err) {
      setError(err.message);
    } finally {
      setOperacionEnCurso(false);
    }
  }

  async function eliminarContacto(id) {
    try {
      setError("");
      setIdEliminando(id);
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((contacto) => contacto.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setIdEliminando(null);
    }
  }

  return (
    <>
      <header className="app-header">
        <p className="eyebrow">Agenda ADSO · API REST</p>
        <h1>Contactos que permanecen.</h1>
        <p className="subtitle">Gestiona tu agenda con React, fetch() y JSON Server.</p>
        <span className="server-status"><span className="status-dot" /> API conectada · localhost:3001</span>
      </header>

      <main className="app-content">
        <FormularioContacto onAgregar={agregarContacto} cargando={operacionEnCurso} />

        <section className="contacts-section" aria-labelledby="contacts-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">GET /contactos</p>
              <h2 id="contacts-title">Tu agenda</h2>
            </div>
            <span className="count-badge">{contactos.length} {contactos.length === 1 ? "contacto" : "contactos"}</span>
          </div>

          {error && <p className="error-message" role="alert">{error}</p>}
          {cargando && <p className="empty-state">Cargando contactos...</p>}
          {!cargando && contactos.length === 0 && <p className="empty-state">Todavía no hay contactos guardados.</p>}
          <div className="contacts-grid">
            {contactos.map((contacto) => (
              <ContactoCard
                key={contacto.id}
                contacto={contacto}
                onEliminar={eliminarContacto}
                eliminando={idEliminando === contacto.id}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <span>Clase 7 · API REST + JSON Server</span>
        <span>Persistencia en db.json</span>
      </footer>
    </>
  );
}
