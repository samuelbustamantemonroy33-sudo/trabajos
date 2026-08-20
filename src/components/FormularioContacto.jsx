import { useState } from "react";

const FORMULARIO_VACIO = { nombre: "", telefono: "", correo: "", etiqueta: "" };

export default function FormularioContacto({ onAgregar, cargando }) {
  const [form, setForm] = useState(FORMULARIO_VACIO);

  function actualizarCampo(evento) {
    setForm({ ...form, [evento.target.name]: evento.target.value });
  }

  function enviarFormulario(evento) {
    evento.preventDefault();
    if (!form.nombre.trim() || !form.telefono.trim() || !form.correo.trim()) return;
    onAgregar(form);
    setForm(FORMULARIO_VACIO);
  }

  return (
    <form className="contact-form" onSubmit={enviarFormulario}>
      <div className="form-heading">
        <p className="eyebrow">Nuevo registro</p>
        <h2>Agregar contacto</h2>
      </div>
      <div className="form-fields">
        <label>
          Nombre
          <input name="nombre" value={form.nombre} onChange={actualizarCampo} placeholder="Nombre completo" required />
        </label>
        <label>
          Teléfono
          <input name="telefono" value={form.telefono} onChange={actualizarCampo} placeholder="321 000 0000" required />
        </label>
        <label>
          Correo
          <input name="correo" type="email" value={form.correo} onChange={actualizarCampo} placeholder="correo@ejemplo.com" required />
        </label>
        <label>
          Etiqueta
          <input name="etiqueta" value={form.etiqueta} onChange={actualizarCampo} placeholder="familia, trabajo..." />
        </label>
      </div>
      <button className="primary-button" type="submit" disabled={cargando}>
        {cargando ? "Guardando..." : "Guardar contacto"}
      </button>
    </form>
  );
}
