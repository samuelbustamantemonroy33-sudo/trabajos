// Importa los hooks para manejar estado local y efectos.
import { useEffect, useState } from "react";
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
    {
      id: 2,
      nombre: "Mateo Silva",
      telefono: "301 456 8899",
      correo: "mateo@sena.edu.co",
      etiqueta: "Familia",
    },
    {
      id: 3,
      nombre: "Lucía Gómez",
      telefono: "320 220 3344",
      correo: "lucia@sena.edu.co",
      etiqueta: "Amiga",
    },
    {
      id: 4,
      nombre: "Daniel Ruiz",
      telefono: "312 998 7755",
      correo: "daniel@sena.edu.co",
      etiqueta: "Colega",
    },
    {
      id: 5,
      nombre: "Sofía Ortega",
      telefono: "314 667 1900",
      correo: "sofia@sena.edu.co",
      etiqueta: "Cliente",
    },
    {
      id: 6,
      nombre: "Andrés Mora",
      telefono: "300 321 4422",
      correo: "andres@sena.edu.co",
      etiqueta: "Proveedor",
    },
    {
      id: 7,
      nombre: "Valeria Díaz",
      telefono: "318 145 6622",
      correo: "valeria@sena.edu.co",
      etiqueta: "Compañera",
    },
  ]);

  // Guardará el contacto completo a editar (o null si solo estamos agregando)
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const [contactosPorPagina, setContactosPorPagina] = useState(3);

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

  const normalizarTexto = (texto) =>
    texto
      .toLocaleLowerCase("es")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const contactosVisibles = contactos
    .filter((contacto) => {
      const termino = normalizarTexto(busqueda.trim());
      return !termino || normalizarTexto(contacto.nombre).startsWith(termino);
    })
    .sort((a, b) => {
      const resultado = normalizarTexto(a.nombre).localeCompare(
        normalizarTexto(b.nombre),
        "es"
      );
      return ordenAscendente ? resultado : -resultado;
    });

  const totalPaginas = Math.max(
    1,
    Math.ceil(contactosVisibles.length / contactosPorPagina)
  );

  const indiceInicio = (paginaActual - 1) * contactosPorPagina;
  const contactosPaginados = contactosVisibles.slice(
    indiceInicio,
    indiceInicio + contactosPorPagina
  );

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, ordenAscendente, contactosPorPagina]);

  useEffect(() => {
    if (paginaActual > totalPaginas) {
      setPaginaActual(totalPaginas);
    }
  }, [paginaActual, totalPaginas]);

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
        <div className="controles-contactos" role="search">
          <label htmlFor="buscar-contactos">Buscar por nombre</label>
          <div className="controles-contactos-fila">
            <input
              id="buscar-contactos"
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Ej. Ana o Z"
              aria-label="Buscar contactos por el inicio del nombre"
            />
            <button
              type="button"
              className="btn-ordenar"
              onClick={() => setOrdenAscendente((actual) => !actual)}
              aria-label={`Ordenar contactos de ${ordenAscendente ? "Z a A" : "A a Z"}`}
            >
              {ordenAscendente ? "A-Z" : "Z-A"}
            </button>
            <select
              className="select-paginacion"
              value={contactosPorPagina}
              onChange={(e) => setContactosPorPagina(Number(e.target.value))}
              aria-label="Cantidad de contactos por página"
            >
              <option value={2}>2 / pág.</option>
              <option value={3}>3 / pág.</option>
              <option value={5}>5 / pág.</option>
            </select>
          </div>
        </div>
        {busqueda && <p className="resumen-busqueda">Resultados para “{busqueda}”: {contactosVisibles.length}</p>}
        <p className="resumen-paginacion">
          Página {paginaActual} de {totalPaginas} · {contactosVisibles.length} contacto{contactosVisibles.length === 1 ? "" : "s"}
        </p>
        <div className="lista-contactos">
        {contactosPaginados.length === 0 ? (
          <p className="sin-resultados">No se encontraron contactos con ese inicio de nombre.</p>
        ) : contactosPaginados.map((c) => (
          <ContactoCard
            key={c.id}
            contacto={c}
            onDelete={eliminarContacto}
            onEdit={seleccionarParaEditar}
          />
        ))}
        </div>

        <div className="paginador" aria-label="Paginación de contactos">
          <button
            type="button"
            className="btn-pagina"
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual((actual) => Math.max(1, actual - 1))}
          >
            ← Anterior
          </button>

          {Array.from({ length: totalPaginas }, (_, index) => index + 1).map((numero) => (
            <button
              key={numero}
              type="button"
              className={`btn-numero ${numero === paginaActual ? "activo" : ""}`}
              onClick={() => setPaginaActual(numero)}
            >
              {numero}
            </button>
          ))}

          <button
            type="button"
            className="btn-pagina"
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual((actual) => Math.min(totalPaginas, actual + 1))}
          >
            Siguiente →
          </button>
        </div>
      </section>
    </main>
  );
}