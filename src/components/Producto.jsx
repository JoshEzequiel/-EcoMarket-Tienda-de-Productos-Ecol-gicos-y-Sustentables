import { Link } from "react-router-dom";
import { formatearPesos, precioFinal } from "../utils/tienda";

// aqui se muestra cada producto y el boton para agregar al carrito
export default function Producto({ producto, onAgregar }) {
  const precio = precioFinal(producto);
  return (
    <article className="tarjeta-producto h-100">
      <Link to={"/productos/" + producto.id} className="imagen-producto">
        <img loading="lazy" src={producto.imagen} alt={producto.nombre} />
        {producto.oferta && (
          <span className="etiqueta-oferta">-{producto.descuento}%</span>
        )}
      </Link>
      <div className="p-3 d-flex flex-column flex-grow-1">
        <span className="categoria-pequena">{producto.categoria}</span>
        <Link className="nombre-producto" to={"/productos/" + producto.id}>
          {producto.nombre}
        </Link>
        <p className="descripcion-producto">{producto.descripcion}</p>
        <div className="mt-auto">
          <div className="d-flex align-items-center gap-2 flex-wrap mb-2">
            <strong className="precio">{formatearPesos(precio)}</strong>
            {producto.oferta && (
              <del className="precio-anterior">
                {formatearPesos(producto.precio)}
              </del>
            )}
          </div>
          <p className={producto.stock > 0 ? "stock-ok" : "stock-agotado"}>
            {producto.stock > 0
              ? `Disponibles: ${producto.stock}`
              : "Sin stock"}
          </p>
          <button
            className="boton-verde w-100"
            disabled={producto.stock <= 0}
            onClick={() => onAgregar(producto.id)}
          >
            {producto.stock > 0 ? "Agregar al carrito" : "Agotado"}
          </button>
        </div>
      </div>
    </article>
  );
}
