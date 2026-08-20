import { useEffect, useState } from "react";

const API = "http://localhost:3001/tareas";

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setTareas(data))     
  }, []);

  function agregarTarea() {
    if (!texto.trim()) return;

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto, estado: "pendiente" }),
    })
      .then((res) => res.json())
      .then((nuevaTarea) => {
        setTareas((prev) => [...prev, nuevaTarea]);
        setTexto("");
      })
      .catch((error) => {
        console.error("Error al agregar tarea:", error);
      });
  }

  function eliminarTarea(id) {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTareas((prev) => prev.filter((tarea) => tarea.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar tarea:", error);
      });
  }

  return (
    <>
      <div>
        <h1>Lista de tareas</h1>
      </div>

      <div>
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {tarea.texto} - {tarea.estado}
            <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </>
  );
}
