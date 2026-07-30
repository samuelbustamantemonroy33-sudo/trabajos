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

  // Agrega o edita según corresponda
  const guardarContacto = (datos) => {
    if (contactoEnEdicion) {
      // Si estamos editando, reemplazamos el objeto correspondiente por su ID
      setContactos((prev) =>
        prev.map((c) => (c.id === contactoEnEdicion.id ? { ...c, ...datos } : c))
      );
      setContactoEnEdicion(null); // Limpiamos el modo edición
    } else {
      // Si no estamos editando, agregamos un nuevo contacto
      setContactos((prev) => [...prev, { id: Date.now(), ...datos }]);
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
      <h1 className="app-title">Agenda ADSO v2</h1>

      {/* Pasamos guardarContacto y el contacto que se va a editar */}
      <FormularioContacto
        onGuardar={guardarContacto}
        contactoEnEdicion={contactoEnEdicion}
        onCancelar={() => setContactoEnEdicion(null)}
      />

      <section className="lista-contactos">
        {contactos.map((c) => (
          <ContactoCard
            key={c.id}
            contacto={c}
            onDelete={eliminarContacto}
            onEdit={() => seleccionarParaEditar(c)}
          />
        ))}
      </section>
    </main>
  );
}