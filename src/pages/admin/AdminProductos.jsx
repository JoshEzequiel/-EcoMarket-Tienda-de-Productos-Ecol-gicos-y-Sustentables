import { Link } from "react-router-dom";
import { useTienda } from "../../context/TiendaContext";
import { formatearPesos } from "../../utils/tienda";
export default function AdminProductos() {
  const { productos, eliminarProducto, sesion } = useTienda();
  const admin = sesion.rol === "Administrador";
  function quitar(id, nombre) {
    if (window.confirm("Eliminar " + nombre + "?")) eliminarProducto(id);
  }
  return (
    <>
      <div className="admin-titulo">
        <span>CATALOGO</span>
        <h1>Productos</h1>
        <p>Lista de productos, precios y control de stock.</p>
      </div>
      <div className="d-flex flex-wrap justify-content-between mb-3 gap-2">
        <span>{productos.length} productos registrados</span>
        {admin && (
          <Link className="boton-verde" to="/admin/productos/nuevo">
            + Nuevo producto
          </Link>
        )}
      </div>
      <div className="panel-blanco p-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover tabla-admin align-middle mb-0">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoria</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img className="mini-producto" src={p.imagen} alt="" />
                      <div>
                        <b>{p.nombre}</b>
                        <div className="text-muted small">{p.codigo}</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.categoria}</td>
                  <td>{formatearPesos(p.precio)}</td>
                  <td>
                    <span
                      className={
                        "badge " +
                        (p.stock <= p.stockCritico
                          ? "text-bg-warning"
                          : "text-bg-success")
                      }
                    >
                      {p.stock} {p.stock <= p.stockCritico ? "Critico" : ""}
                    </span>
                  </td>
                  <td>
                    {admin ? (
                      <div className="d-flex gap-2">
                        <Link
                          className="btn btn-sm btn-outline-success"
                          to={"/admin/productos/editar/" + p.id}
                        >
                          Editar
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => quitar(p.id, p.nombre)}
                        >
                          Borrar
                        </button>
                      </div>
                    ) : (
                      <span className="text-muted">Solo lectura</span>
                    )}
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
