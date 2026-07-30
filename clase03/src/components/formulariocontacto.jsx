// Importa hook para manejar estado del formulario.
import { useState } from "react";

// Componente de formulario para crear un contacto.
export default function FormularioContacto({ onAgregar }) {
  // Estado local con los campos del formulario.
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    etiqueta: "",
  });

  // Actualiza un campo del formulario cuando el usuario escribe.
  const onChange = (e) => {
    // Extrae nombre del input y valor actual.
    const { name, value } = e.target;
    // Copia estado anterior y reemplaza solo el campo modificado.
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Controla el envío del formulario.
  const onSubmit = (e) => {
    // Evita que el navegador recargue la página al enviar.
    e.preventDefault();
    // Valida que nombre y teléfono no estén vacíos.
    if (!form.nombre.trim() || !form.telefono.trim()) {
      alert("Completa al menos Nombre y Teléfono");
      return;
    }
    // Envía los datos al componente padre para agregarlos a la lista.
    onAgregar(form);
    // Limpia el formulario después de guardar.
    setForm({ nombre: "", correo: "", telefono: "", etiqueta: "" });
  };

  return (
    <form onSubmit={onSubmit} className="form-contacto">
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={onChange} />
      <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={onChange} />
      <input name="correo" placeholder="Correo" value={form.correo} onChange={onChange} />
      <input name="etiqueta" placeholder="Etiqueta (opcional)" value={form.etiqueta} onChange={onChange} />
      <button type="submit">Agregar contacto</button>
    </form>
  );
}