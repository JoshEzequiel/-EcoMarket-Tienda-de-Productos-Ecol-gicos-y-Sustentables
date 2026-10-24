import { Link, useParams } from "react-router-dom";
import { useTienda } from "../context/TiendaContext";
import { formatearPesos, precioFinal } from "../utils/tienda";
export default function DetalleProducto() {
  const { id } = useParams();
  const { productos, agregarCarrito } = useTienda();
  const p = productos.find((producto) => producto.id === Number(id));
  if (!p)
    return (
      <main className="container py-5">
        <h1>Producto no encontrado</h1>
        <Link to="/productos">Volver al catalogo</Link>
      </main>
    );
  return (
    <main className="container seccion py-5">
      <Link className="enlace-ver" to="/productos">
        ← Volver a productos
      </Link>
      <div className="row g-5 mt-2 align-items-center">
        <div className="col-md-6">
          <div className="imagen-detalle">
            <img src={p.imagen} alt={p.nombre} />
          </div>
        </div>
        <div className="col-md-6">
          <span className="texto-etiqueta">{p.categoria}</span>
          <h1 className="mt-2">{p.nombre}</h1>
          <p className="text-muted">Codigo: {p.codigo}</p>
          <p className="fs-5">{p.descripcion}</p>
          <div className="d-flex gap-2 align-items-center my-4">
            <strong className="precio-grande">
              {formatearPesos(precioFinal(p))}
            </strong>
            {p.oferta && <del>{formatearPesos(p.precio)}</del>}
          </div>
          <p>{p.stock > 0 ? `${p.stock} unidades disponibles` : "Sin stock"}</p>
          <button
            disabled={p.stock === 0}
            className="boton-verde"
            onClick={() => agregarCarrito(p.id)}
          >
            Agregar al carrito
          </button>
          <div className="aviso-suave mt-4">
          </div>
        </div>
      </div>
    </main>
  );
}
