import { useTienda } from "../../context/TiendaContext";
import { formatearPesos } from "../../utils/tienda";
export default function AdminReportes() {
  const { pedidos, productos, mensajes, sesion } = useTienda();
  if (sesion.rol !== "Administrador") return <p>Sin permiso.</p>;
  const exitosos = pedidos.filter((p) => p.estado === "Aprobada");
  const total = exitosos.reduce((s, p) => s + p.total, 0);
  const unidades = exitosos.reduce(
    (s, p) => s + p.items.reduce((n, i) => n + i.cantidad, 0),
    0,
  );
  return (
    <>
      <div className="admin-titulo">
        <span>INFORMACION DE LA TIENDA</span>
        <h1>Reportes</h1>
      </div>
      <div className="row g-3">
        {[
          ["Ventas aprobadas", exitosos.length],
          ["Monto simulado", formatearPesos(total)],
          ["Unidades vendidas", unidades],
          ["Mensajes recibidos", mensajes.length],
          [
            "Stock critico",
            productos.filter((p) => p.stock <= p.stockCritico).length,
          ],
        ].map(([nombre, numero]) => (
          <div className="col-md-4" key={nombre}>
            <div className="kpi-admin">
              <h3>{numero}</h3>
              <p>{nombre}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-muted small mt-4">
        Estas cifras corresponden solo a la informacion almacenada en
        localStorage.
      </p>
    </>
  );
}
