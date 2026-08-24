// Importa el hook para manejar estado local.
import { useState } from "react";
// Importa estilos globales del componente principal.
import "./App.css";
// Importa la tarjeta visual para cada contacto.
import ContactoCard from "./components/ContactoCard";
// Importa el formulario para crear contactos.
import FormularioContacto from "./components/FormularioContacto";

export default function App() {
  const [contactos, setContactos] = useState([
    {
      id: 1,
      nombre: "Carolina Pérez",
      telefono: "300 123 4567",
      correo: "carolina@sena.edu.co",
      etiqueta: "Compañera",
    },
  ]);

  // Guardará el contacto completo a editar (o null si solo estamos agregando)
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);
  const [error, setError] = useState("");

  // Agrega o edita según corresponda
  const guardarContacto = async (datos) => {
    try {
      setError("");
      if (contactoEnEdicion) {
      // Si estamos editando, reemplazamos el objeto correspondiente por su ID
      setContactos((prev) =>
        prev.map((c) => (c.id === contactoEnEdicion.id ? { ...c, ...datos } : c))
      );
        setContactoEnEdicion(null);
      } else {
      // Si no estamos editando, agregamos un nuevo contacto
      setContactos((prev) => [...prev, { id: Date.now(), ...datos }]);
      }
    } catch (guardarError) {
      console.error("Error al guardar el contacto:", guardarError);
      setError("No se pudo guardar el contacto. Intenta de nuevo.");
      throw guardarError;
    }
  };

  const eliminarContacto = (id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
    // Si eliminamos el que se estaba editando, limpiamos la edición
    if (contactoEnEdicion?.id === id) setContactoEnEdicion(null);
  };

  // Prepara un contacto para cargarlo en el formulario
  const seleccionarParaEditar = (contacto) => {
    setContactoEnEdicion(contacto);
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <div>
          <p className="eyebrow">ADSO / CONTACTOS</p>
          <h1 className="app-title">Tu agenda, en orden.</h1>
          <p className="app-subtitle">Guarda la información de las personas importantes para ti.</p>
        </div>
        <div className="contact-count" aria-label={`${contactos.length} contactos guardados`}>
          <strong>{String(contactos.length).padStart(2, "0")}</strong>
          <span>contactos</span>
        </div>
      </header>

      {error && <div className="alert-error" role="alert"><span aria-hidden="true">!</span><p>{error}</p><button type="button" onClick={() => setError("")} aria-label="Cerrar mensaje">&times;</button></div>}

      {/* Pasamos guardarContacto y el contacto que se va a editar */}
      <FormularioContacto
        onGuardar={guardarContacto}
        contactoEnEdicion={contactoEnEdicion}
        onCancelar={() => setContactoEnEdicion(null)}
      />

      <section className="contactos-section" aria-labelledby="contactos-title">
        <div className="section-heading"><div><p className="eyebrow">LISTA PERSONAL</p><h2 id="contactos-title">Contactos guardados</h2></div><span className="section-line" aria-hidden="true" /></div>
        <div className="lista-contactos">
        {contactos.map((c) => (
          <ContactoCard
            key={c.id}
            contacto={c}
            onDelete={eliminarContacto}
            onEdit={seleccionarParaEditar}
          />
        ))}
        </div>
      </section>
    </main>
  );
}