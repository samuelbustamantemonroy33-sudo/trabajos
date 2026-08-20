export default function ContactoCard({ contacto, onEliminar, eliminando }) {
  return (
    <article className="contact-card">
      <div className="contact-card-top">
        <div className="avatar" aria-hidden="true">{contacto.nombre.charAt(0).toUpperCase()}</div>
        <div className="contact-info">
          <h3>{contacto.nombre}</h3>
          {contacto.etiqueta && <span className="contact-tag">{contacto.etiqueta}</span>}
        </div>
      </div>
      <dl>
        <div><dt>Teléfono</dt><dd>{contacto.telefono}</dd></div>
        <div><dt>Correo</dt><dd>{contacto.correo}</dd></div>
      </dl>
      <button className="delete-button" onClick={() => onEliminar(contacto.id)} disabled={eliminando}>
        {eliminando ? "Eliminando..." : "Eliminar"}
      </button>
    </article>
  );
}
