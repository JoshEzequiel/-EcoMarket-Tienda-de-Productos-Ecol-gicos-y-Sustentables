import { Link } from "react-router-dom";
import { useTienda } from "../../context/TiendaContext";
import { formatearPesos } from "../../utils/tienda";
export default function AdminInicio() {
  const { productos, usuarios, pedidos, sesion } = useTienda();
  const aprobados = pedidos.filter((p) => p.estado === "Aprobada");
  const criticos = productos.filter((p) => p.stock <= p.stockCritico);
  return (
    <>
      <div className="admin-titulo">
        <span>ADMINISTRACION</span>
        <h1>Resumen de la tienda</h1>
        <p>
          Bienvenido, {sesion.nombre}. Revisa los datos guardados en este
          navegador.
        </p>
      </div>
      <div className="row g-3 mb-4">
        {[
          ["Productos", productos.length, "♻"],
          ["Usuarios", usuarios.length, "👥"],
          ["Ordenes", pedidos.length, "📦"],
          [
            "Ventas simuladas",
            formatearPesos(aprobados.reduce((s, p) => s + p.total, 0)),
            "💚",
          ],
        ].map(([titulo, cantidad, icono]) => (
          <div className="col-sm-6 col-xl-3" key={titulo}>
            <div className="kpi-admin">
              <span>{icono}</span>
              <h3>{cantidad}</h3>
              <p>{titulo}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="row g-4">
        <div className="col-lg-7">
          <div className="panel-blanco">
            <h2 className="h4">Stock critico</h2>
            {criticos.length === 0 ? (
              <p>Por ahora no hay productos criticos.</p>
            ) : (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Stock</th>
                      <th>Limite</th>
                    </tr>
                  </thead>
                  <tbody>
                    {criticos.map((p) => (
                      <tr key={p.id}>
                        <td>{p.nombre}</td>
                        <td className="text-danger fw-bold">{p.stock}</td>
                        <td>{p.stockCritico}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <Link to="/admin/productos">Ver productos →</Link>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="panel-blanco">
            <h2 className="h4">Accesos rapidos</h2>
            <div className="d-grid gap-2">
              <Link className="boton-outline text-center" to="/admin/productos">
                Administrar productos
              </Link>
              {sesion.rol === "Administrador" && (
                <>
                  <Link
                    className="boton-outline text-center"
                    to="/admin/pedidos"
                  >
                    Ver ordenes
                  </Link>
                  <Link
                    className="boton-outline text-center"
                    to="/admin/usuarios"
                  >
                    Administrar usuarios
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
