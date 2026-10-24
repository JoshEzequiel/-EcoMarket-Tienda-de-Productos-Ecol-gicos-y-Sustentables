import { useState } from "react";
import { useTienda } from "../../context/TiendaContext";
export default function AdminCategorias() {
  const {
    categorias,
    productos,
    agregarCategoria,
    quitarCategoria,
    renombrarCategoria,
    sesion,
  } = useTienda();
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  if (sesion.rol !== "Administrador")
    return (
      <div className="alert alert-warning">Acceso solo para administrador.</div>
    );
  function crear(e) {
    e.preventDefault();
    const n = nombre.trim();
    if (!n || categorias.some((c) => c.toLowerCase() === n.toLowerCase())) {
      setError("Escribe una categoria nueva.");
      return;
    }
    agregarCategoria(n);
    setNombre("");
    setError("");
  }
  function editar(cat) {
    const nuevo = window.prompt("Nuevo nombre", cat)?.trim();
    if (!nuevo || nuevo === cat) return;
    if (categorias.some((c) => c.toLowerCase() === nuevo.toLowerCase())) {
      setError("Esa categoria ya existe.");
      return;
    }
    renombrarCategoria(cat, nuevo);
    setError("");
  }
  function borrar(cat) {
    if (productos.some((p) => p.categoria === cat)) {
      setError("No puedes borrar una categoria que contiene productos.");
      return;
    }
    if (window.confirm("Eliminar " + cat + "?")) quitarCategoria(cat);
  }
  return (
    <>
      <div className="admin-titulo">
        <span>ADMINISTRACION</span>
        <h1>Categorias</h1>
      </div>
      <div className="panel-blanco">
        <form className="d-flex gap-2" onSubmit={crear}>
          <input
            aria-label="Nombre de categoria"
            className="form-control"
            placeholder="Nueva categoria"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <button className="boton-verde">Crear</button>
        </form>
        {error && <div className="alert alert-warning mt-3">{error}</div>}
        <div className="table-responsive mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Productos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((cat) => (
                <tr key={cat}>
                  <td>{cat}</td>
                  <td>{productos.filter((p) => p.categoria === cat).length}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-success me-2"
                      onClick={() => editar(cat)}
                    >
                      Renombrar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => borrar(cat)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
