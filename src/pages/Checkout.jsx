import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTienda } from "../context/TiendaContext";
import { formatearPesos } from "../utils/tienda";
import TituloPagina from "../components/TituloPagina";
export default function Checkout() {
  const { carrito, sesion, resumen, comprar } = useTienda();
  const navegar = useNavigate();
  const [datos, setDatos] = useState({
    nombre: sesion?.nombre || "",
    apellido: sesion?.apellido || "",
    email: sesion?.email || "",
    direccion: sesion?.direccion || "",
    region: sesion?.region || "",
    comuna: sesion?.comuna || "",
    instrucciones: "",
  });
  const [forma, setForma] = useState("aprobado");
  const [error, setError] = useState("");
  function enviar(e) {
    e.preventDefault();
    if (
      !datos.nombre.trim() ||
      !datos.apellido.trim() ||
      !datos.email.includes("@") ||
      !datos.direccion.trim() ||
      !datos.region.trim() ||
      !datos.comuna.trim()
    ) {
      setError("Completa los datos del cliente y de entrega.");
      return;
    }
    const pedido = comprar(datos, forma === "aprobado");
    if (pedido)
      navegar(forma === "aprobado" ? "/compra/exito" : "/compra/error");
  }
  const campos = [
    ["nombre", "Nombre"],
    ["apellido", "Apellido"],
    ["email", "Correo"],
    ["direccion", "Calle y numero"],
    ["region", "Region"],
    ["comuna", "Comuna"],
  ];
  return (
    <>
      <TituloPagina
        titulo="Finalizar compra"
        descripcion="Completa los datos de envio. El pago sera una simulacion."
      />
      <main className="container py-5">
        {!carrito.length ? (
          <div className="aviso-vacio">
            No hay productos en el carrito.{" "}
            <Link to="/productos">Volver al catalogo</Link>
          </div>
        ) : (
          <form onSubmit={enviar} className="row g-4" noValidate>
            <div className="col-lg-8">
              <div className="panel-blanco">
                <h2 className="h4 mb-3">Informacion del cliente y entrega</h2>
                <div className="row g-3">
                  {campos.map(([clave, titulo]) => (
                    <div className="col-md-6" key={clave}>
                      <label htmlFor={"check-" + clave} className="form-label">
                        {titulo}
                      </label>
                      <input
                        className="form-control"
                        id={"check-" + clave}
                        type={clave === "email" ? "email" : "text"}
                        value={datos[clave]}
                        onChange={(e) =>
                          setDatos({ ...datos, [clave]: e.target.value })
                        }
                      />
                    </div>
                  ))}
                  <div className="col-12">
                    <label htmlFor="instrucciones" className="form-label">
                      Indicaciones para la entrega (opcional)
                    </label>
                    <textarea
                      id="instrucciones"
                      className="form-control"
                      value={datos.instrucciones}
                      onChange={(e) =>
                        setDatos({ ...datos, instrucciones: e.target.value })
                      }
                    />
                  </div>
                </div>
                <h3 className="h5 mt-4">Resultado del pago (simulacion)</h3>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    id="pago-ok"
                    type="radio"
                    name="pago"
                    checked={forma === "aprobado"}
                    onChange={() => setForma("aprobado")}
                  />
                  <label htmlFor="pago-ok" className="form-check-label">
                    Simular pago aprobado
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    id="pago-error"
                    type="radio"
                    name="pago"
                    checked={forma === "rechazado"}
                    onChange={() => setForma("rechazado")}
                  />
                  <label htmlFor="pago-error" className="form-check-label">
                    Simular pago rechazado
                  </label>
                </div>
                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="panel-blanco">
                <h2 className="h4">Total a pagar</h2>
                <p className="precio-grande">{formatearPesos(resumen.total)}</p>
                <p className="text-muted">
                  Incluye descuento: {formatearPesos(resumen.descuento)}
                </p>
                <button className="boton-verde w-100">
                  Confirmar compra simulada
                </button>
              </div>
            </div>
          </form>
        )}
      </main>
    </>
  );
}
