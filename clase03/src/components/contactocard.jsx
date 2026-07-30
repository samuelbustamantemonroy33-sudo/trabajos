// ContactoCard.jsx — construido según la especificación de la guía:
// recibe los datos por props y expone un botón Eliminar type="button".

// Componente que muestra la tarjeta visual de un contacto.
export default function ContactoCard({ id, nombre, telefono, correo, etiqueta, onDelete }) {
  return (
    <article className="tarjeta-contacto">
      <h3>{nombre}</h3>
      <p className="dato">{telefono}</p>
      {correo && <p className="dato">{correo}</p>}
      {etiqueta && <p className="tag">{etiqueta}</p>}
      <div className="acciones">
        {/* type="button" evita que dispare un submit accidental */}
        <button
          type="button"
          className="btn-eliminar"
          onClick={() => onDelete(id)}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}