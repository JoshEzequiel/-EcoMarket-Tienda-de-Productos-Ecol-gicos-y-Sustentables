import { Link, useParams } from "react-router-dom";
import TituloPagina from "../components/TituloPagina";
import { useTienda } from "../context/TiendaContext";
import { formatearPesos } from "../utils/tienda";
export default function ResultadoCompra() {
  const { tipo } = useParams();
  const { ultimoResultado } = useTienda();
  if (
    !ultimoResultado ||
    (tipo === "exito" && ultimoResultado.estado !== "Aprobada") ||
    (tipo === "error" && ultimoResultado.estado !== "Rechazada")
  )
    return (
      <main className="container py-5">
        <h1>No hay un resultado de compra para mostrar.</h1>
        <Link to="/productos">Volver</Link>
      </main>
    );
  const ok = tipo === "exito";
  return (
    <>
      <TituloPagina
        titulo={ok ? "Compra realizada" : "No se pudo realizar el pago"}
        descripcion="Resultado de la compra de demostracion."
      />
      <main className="container py-5">
        <div className="panel-blanco resultado-centrado">
          <div
            className={"estado-grande " + (ok ? "text-success" : "text-danger")}
          >
            {ok ? "✓" : "✕"}
          </div>
          <h2>{ok ? "Tu compra fue aprobada" : "El pago fue rechazado"}</h2>
          <p>
            Numero de pedido: <strong>#{ultimoResultado.id}</strong>
          </p>
          <p>
            {ultimoResultado.cliente.nombre} {ultimoResultado.cliente.apellido}{" "}
            · {ultimoResultado.cliente.email}
          </p>
          <p>
            Entrega: {ultimoResultado.cliente.direccion},{" "}
            {ultimoResultado.cliente.comuna}
          </p>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {ultimoResultado.items.map((p, i) => (
                  <tr key={i}>
                    <td>{p.nombre}</td>
                    <td>{p.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="precio-grande">
            Total: {formatearPesos(ultimoResultado.total)}
          </p>
          <p className="text-muted">
            Esta compra es solo una simulacion, no se realizaron cobros ni
            envios.
          </p>
          <Link
            className="boton-verde d-inline-block"
            to={ok ? "/productos" : "/checkout"}
          >
            {ok ? "Seguir comprando" : "Volver a intentar"}
          </Link>
        </div>
      </main>
    </>
  );
}
