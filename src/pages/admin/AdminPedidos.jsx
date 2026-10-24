import { useTienda } from "../../context/TiendaContext";
import { formatearPesos } from "../../utils/tienda";
export default function AdminPedidos() {
  const { pedidos, sesion } = useTienda();
  if (sesion.rol !== "Administrador") return <p>Sin permiso.</p>;
  return (
    <>
      <div className="admin-titulo">
        <span>VENTAS SIMULADAS</span>
        <h1>Ordenes y boletas</h1>
      </div>
      <div className="panel-blanco">
        <p className="text-muted small">
          Las boletas son resumentes de prueba. No son documentos tributarios.
        </p>
        {!pedidos.length ? (
          <p>Todavia no hay pedidos.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Numero</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((p) => (
                  <tr key={p.id}>
                    <td>#{p.id}</td>
                    <td>{new Date(p.fecha).toLocaleDateString("es-CL")}</td>
                    <td>
                      {p.cliente.nombre} {p.cliente.apellido}
                    </td>
                    <td>{formatearPesos(p.total)}</td>
                    <td>
                      <span
                        className={
                          "badge " +
                          (p.estado === "Aprobada"
                            ? "text-bg-success"
                            : "text-bg-danger")
                        }
                      >
                        {p.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
