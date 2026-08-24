import { useEffect, useState } from "react";

const formularioInicial = { nombre: "", correo: "", telefono: "", etiqueta: "" };

export default function FormularioContacto({ onGuardar, contactoEnEdicion, onCancelar }) {
  const [form, setForm] = useState(formularioInicial);
  const [errores, setErrores] = useState({ nombre: "", telefono: "", correo: "" });
  const [enviando, setEnviando] = useState(false);
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    setForm(contactoEnEdicion ? { ...formularioInicial, ...contactoEnEdicion } : formularioInicial);
    setErrores({ nombre: "", telefono: "", correo: "" });
    setGuardado(false);
  }, [contactoEnEdicion]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((actual) => ({ ...actual, [name]: value }));
    setGuardado(false);
    if (errores[name]) setErrores((actual) => ({ ...actual, [name]: "" }));
  };

  const validarFormulario = () => {
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!form.telefono.trim()) nuevosErrores.telefono = "El teléfono es obligatorio.";
    if (!form.correo.trim()) nuevosErrores.correo = "El correo es obligatorio.";
    else if (!form.correo.includes("@")) nuevosErrores.correo = "El correo debe contener @.";
    setErrores(nuevosErrores);
    return !nuevosErrores.nombre && !nuevosErrores.telefono && !nuevosErrores.correo;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (enviando || !validarFormulario()) return;
    try {
      setEnviando(true);
      await onGuardar({ ...form, nombre: form.nombre.trim(), telefono: form.telefono.trim(), correo: form.correo.trim() });
      setForm(formularioInicial);
      setErrores({ nombre: "", telefono: "", correo: "" });
      setGuardado(true);
    } finally {
      setEnviando(false);
    }
  };

  const campoConError = (campo) => Boolean(errores[campo]);

  return (
    <form onSubmit={onSubmit} className="form-contacto" noValidate>
      <div className="form-heading">
        <div><p className="eyebrow">NUEVO REGISTRO</p><h2>{contactoEnEdicion ? "Editar contacto" : "Añadir contacto"}</h2></div>
        <span className="required-note">* Campos obligatorios</span>
      </div>
      {guardado && <p className="alert-success" role="status">Contacto guardado correctamente.</p>}
      <div className="field"><label htmlFor="nombre">Nombre completo <span>*</span></label><input id="nombre" name="nombre" placeholder="Ej. Carolina Pérez" value={form.nombre} onChange={onChange} aria-invalid={campoConError("nombre")} aria-describedby={errores.nombre ? "nombre-error" : undefined} />{errores.nombre && <p id="nombre-error" className="field-error">{errores.nombre}</p>}</div>
      <div className="field"><label htmlFor="telefono">Teléfono <span>*</span></label><input id="telefono" name="telefono" type="tel" placeholder="Ej. 300 123 4567" value={form.telefono} onChange={onChange} aria-invalid={campoConError("telefono")} aria-describedby={errores.telefono ? "telefono-error" : undefined} />{errores.telefono && <p id="telefono-error" className="field-error">{errores.telefono}</p>}</div>
      <div className="field"><label htmlFor="correo">Correo electrónico <span>*</span></label><input id="correo" name="correo" type="email" placeholder="Ej. carolina@sena.edu.co" value={form.correo} onChange={onChange} aria-invalid={campoConError("correo")} aria-describedby={errores.correo ? "correo-error" : undefined} />{errores.correo && <p id="correo-error" className="field-error">{errores.correo}</p>}</div>
      <div className="field"><label htmlFor="etiqueta">Etiqueta <small>Opcional</small></label><select id="etiqueta" name="etiqueta" value={form.etiqueta} onChange={onChange}><option value="">Selecciona una etiqueta</option><option value="Amigo">Amigo</option><option value="Compañero">Compañero</option><option value="Familia">Familia</option><option value="Trabajo">Trabajo</option></select></div>
      <div className="acciones-form"><button type="submit" disabled={enviando}>{enviando ? "Guardando..." : contactoEnEdicion ? "Guardar cambios" : "Guardar contacto"}</button>{contactoEnEdicion && <button type="button" onClick={onCancelar} className="btn-cancelar" disabled={enviando}>Cancelar</button>}</div>
    </form>
  );
}
