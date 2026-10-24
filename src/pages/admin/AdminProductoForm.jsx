import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTienda } from "../../context/TiendaContext";
const vacio = {
  codigo: "",
  nombre: "",
  descripcion: "",
  precio: 0,
  stock: 0,
  stockCritico: 0,
  categoria: "",
  imagen: "/images/botella.svg",
  oferta: false,
  descuento: 0,
};
export default function AdminProductoForm() {
  const { id } = useParams();
  const editar = Boolean(id);
  const { productos, categorias, crearProducto, editarProducto, sesion } =
    useTienda();
  const encontrado = editar ? productos.find((p) => p.id === Number(id)) : null;
  const [datos, setDatos] = useState(encontrado || vacio);
  const [error, setError] = useState("");
  const navegar = useNavigate();
  useEffect(() => setDatos(encontrado || vacio), [id, productos]);
  if (sesion.rol !== "Administrador")
    return (
      <p className="alert alert-warning">
        No tienes permiso para modificar productos.
      </p>
    );
  if (editar && !encontrado) return <p>Producto no encontrado.</p>;
  const campos = [
    ["codigo", "Codigo de producto", "text"],
    ["nombre", "Nombre", "text"],
    ["descripcion", "Descripcion", "text"],
    ["precio", "Precio", "number"],
    ["stock", "Stock", "number"],
    ["stockCritico", "Stock critico", "number"],
  ];
  function enviar(e) {
    e.preventDefault();
    if (
      datos.codigo.trim().length < 3 ||
      !datos.nombre.trim() ||
      !datos.categoria ||
      datos.precio < 0 ||
      datos.stock < 0 ||
      datos.stockCritico < 0 ||
      !Number.isInteger(Number(datos.stock))
    ) {
      setError("Revisa los campos obligatorios y los valores numericos.");
      return;
    }
    if (
      productos.some(
        (p) =>
          p.codigo.toLowerCase() === datos.codigo.trim().toLowerCase() &&
          p.id !== Number(id),
      )
    ) {
      setError("Este codigo ya existe.");
      return;
    }
    const nuevo = {
      ...datos,
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      stockCritico: Number(datos.stockCritico),
      descuento: datos.oferta ? Number(datos.descuento) : 0,
    };
    if (editar) editarProducto(Number(id), nuevo);
    else crearProducto(nuevo);
    navegar("/admin/productos");
  }
  return (
    <>
      <div className="admin-titulo">
        <span>ADMINISTRACION</span>
        <h1>{editar ? "Editar producto" : "Nuevo producto"}</h1>
      </div>
      <div className="panel-blanco formulario-admin">
        <form onSubmit={enviar}>
          <div className="row g-3">
            {campos.map(([clave, nombre, tipo]) => (
              <div className="col-md-6" key={clave}>
                <label className="form-label" htmlFor={"p-" + clave}>
                  {nombre}
                </label>
                <input
                  id={"p-" + clave}
                  className="form-control"
                  type={tipo}
                  min={tipo === "number" ? 0 : undefined}
                  value={datos[clave]}
                  onChange={(e) =>
                    setDatos({
                      ...datos,
                      [clave]:
                        tipo === "number"
                          ? Number(e.target.value)
                          : e.target.value,
                    })
                  }
                />
              </div>
            ))}
            <div className="col-md-6">
              <label className="form-label" htmlFor="p-categoria">
                Categoria
              </label>
              <select
                className="form-select"
                id="p-categoria"
                value={datos.categoria}
                onChange={(e) =>
                  setDatos({ ...datos, categoria: e.target.value })
                }
              >
                <option value="">Seleccionar</option>
                {categorias.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="p-imagen" className="form-label">
                Imagen del producto
              </label>
              <select
                id="p-imagen"
                className="form-select"
                value={datos.imagen}
                onChange={(e) => setDatos({ ...datos, imagen: e.target.value })}
              >
                {[
                  "botella",
                  "jabon",
                  "bolsa",
                  "cafe",
                  "cepillo",
                  "cuaderno",
                  "polera",
                  "solar",
                  "vela",
                ].map((n) => (
                  <option value={"/images/" + n + ".svg"} key={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="p-oferta">
                En oferta?
              </label>
              <select
                id="p-oferta"
                className="form-select"
                value={String(datos.oferta)}
                onChange={(e) =>
                  setDatos({ ...datos, oferta: e.target.value === "true" })
                }
              >
                <option value="false">No</option>
                <option value="true">Si</option>
              </select>
            </div>
            {datos.oferta && (
              <div className="col-md-6">
                <label className="form-label" htmlFor="p-descuento">
                  Descuento (%)
                </label>
                <input
                  id="p-descuento"
                  className="form-control"
                  type="number"
                  min="0"
                  max="90"
                  value={datos.descuento}
                  onChange={(e) =>
                    setDatos({
                      ...datos,
                      descuento: Math.max(
                        0,
                        Math.min(90, Number(e.target.value)),
                      ),
                    })
                  }
                />
              </div>
            )}
          </div>
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
          <div className="d-flex gap-2 mt-4">
            <button className="boton-verde">Guardar producto</button>
            <Link className="boton-outline" to="/admin/productos">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
