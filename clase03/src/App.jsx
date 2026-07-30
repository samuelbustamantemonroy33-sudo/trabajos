// Importa el hook para manejar estado local.
import { useState } from "react";
// Importa estilos globales del componente principal.
import "./App.css";
// Importa la tarjeta visual para cada contacto.
import ContactoCard from "./components/ContactoCard";
// Importa el formulario para crear contactos.
import FormularioContacto from "./components/FormularioContacto";

// Componente principal de la agenda.
export default function App() {
  // Estado: lista de contactos inicial con un ejemplo.
  const [contactos, setContactos] = useState([
    {
      // Identificador único del contacto.
      id: 1,
      nombre: "Carolina Pérez",
      telefono: "300 123 4567",
      correo: "carolina@sena.edu.co",
      etiqueta: "Compañera",
    },
  ]);

  // Agrega un nuevo contacto al estado.
  const agregarContacto = (nuevo) => {
    // Toma el estado previo y agrega el nuevo con un id generado.
    setContactos((prev) => [...prev, { id: Date.now(), ...nuevo }]);
  };

  // Elimina un contacto por su id.
  const eliminarContacto = (id) => {
    // Filtra todos menos el que coincide con el id a eliminar.
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO v2</h1>
      <FormularioContacto onAgregar={agregarContacto} />
      <section className="lista-contactos">
        {contactos.map((c) => (
          <ContactoCard
            key={c.id}
            id={c.id}
            nombre={c.nombre}
            telefono={c.telefono}
            correo={c.correo}
            etiqueta={c.etiqueta}
            onDelete={eliminarContacto}
          />
        ))}
      </section>
    </main>
  );
}