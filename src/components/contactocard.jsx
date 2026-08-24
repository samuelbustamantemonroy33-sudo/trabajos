export default function ContactoCard({ contacto, onDelete, onEdit }) {
  const { id, nombre, telefono, correo, etiqueta } = contacto;
  return (
    <article className="tarjeta-contacto">
      <div className="contacto-identidad"><div className="avatar" aria-hidden="true">{nombre.charAt(0)}</div><div><h3>{nombre}</h3>{etiqueta && <span className="tag">{etiqueta}</span>}</div></div>
      <div className="datos-contacto"><p className="dato"><span aria-hidden="true">☎</span>{telefono}</p>{correo && <p className="dato"><span aria-hidden="true">✉</span>{correo}</p>}</div>
      <div className="acciones"><button type="button" className="btn-editar" onClick={() => onEdit(contacto)}>Editar</button><button type="button" className="btn-eliminar" onClick={() => onDelete(id)}>Eliminar</button></div>
    </article>
  );
}
