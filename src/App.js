import { useEffect, useState } from "react";

function App() {
  const API_URL = "https://umb-web-taller-1.onrender.com";

  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [editando, setEditando] = useState(null);

  // GET
  const cargarTareas = async () => {
    const resp = await fetch(API_URL);
    const data = await resp.json();
    setTareas(data);
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  // POST - Crear
  const agregarTarea = async (e) => {
    e.preventDefault();
    if (titulo.trim() === "") return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo }),
    });

    setTitulo("");
    cargarTareas();
  };

  // PUT - Editar
  const actualizarTarea = async (e) => {
    e.preventDefault();
    if (titulo.trim() === "") return;

    await fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editando, titulo }),
    });

    setTitulo("");
    setEditando(null);
    cargarTareas();
  };

  // DELETE - Eliminar
  const eliminarTarea = async (id) => {
    await fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    cargarTareas();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestor de Tareas — React + PHP</h1>

      {/* FORMULARIO */}
      <form onSubmit={editando ? actualizarTarea : agregarTarea}>
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <button type="submit">{editando ? "Actualizar" : "Agregar"}</button>
      </form>

      {/* LISTA */}
      <ul>
        {tareas.map((t) => (
          <li key={t.id}>
            {t.titulo}

            <button
              onClick={() => {
                setEditando(t.id);
                setTitulo(t.titulo);
              }}
            >
              Editar
            </button>

            <button onClick={() => eliminarTarea(t.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
