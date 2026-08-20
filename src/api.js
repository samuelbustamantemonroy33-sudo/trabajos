const API = "http://localhost:3001/contactos";

async function comprobarRespuesta(respuesta, mensaje) {
  if (!respuesta.ok) throw new Error(mensaje);
  return respuesta;
}

export async function listarContactos() {
  const respuesta = await fetch(API);
  await comprobarRespuesta(respuesta, "No se pudo cargar la lista de contactos.");
  return respuesta.json();
}

export async function crearContacto(contacto) {
  const respuesta = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contacto),
  });
  await comprobarRespuesta(respuesta, "No se pudo agregar el contacto.");
  return respuesta.json();
}

export async function eliminarContactoPorId(id) {
  const respuesta = await fetch(`${API}/${id}`, { method: "DELETE" });
  await comprobarRespuesta(respuesta, "No se pudo eliminar el contacto.");
}
