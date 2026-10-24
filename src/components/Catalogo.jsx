import { useEffect, useState } from "react";
import Producto from "./Producto";
const POR_PAGINA = 6;

export default function Catalogo({ productos, onAgregar }) {
  const [pagina, setPagina] = useState(1);
  useEffect(() => setPagina(1), [productos]);
  const totalPaginas = Math.ceil(productos.length / POR_PAGINA);
  const productosVisibles = productos.slice(
    (pagina - 1) * POR_PAGINA,
    pagina * POR_PAGINA,
  );
  return (
    <>
      {!productos.length ? (
        <div className="aviso-vacio">
          No encontramos productos con ese filtro.
        </div>
      ) : (
        <>
          <div className="row g-4">
            {productosVisibles.map((producto) => (
              <div className="col-sm-6 col-lg-4" key={producto.id}>
                <Producto producto={producto} onAgregar={onAgregar} />
              </div>
            ))}
          </div>
          {totalPaginas > 1 && (
            <nav
              aria-label="Paginacion de productos"
              className="paginacion mt-4 d-flex justify-content-center align-items-center gap-2 flex-wrap"
            >
              <button
                disabled={pagina === 1}
                onClick={() => setPagina((p) => p - 1)}
              >
                Anterior
              </button>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    aria-current={p === pagina ? "page" : undefined}
                    className={p === pagina ? "seleccionada" : ""}
                    onClick={() => setPagina(p)}
                    key={p}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                disabled={pagina === totalPaginas}
                onClick={() => setPagina((p) => p + 1)}
              >
                Siguiente
              </button>
            </nav>
          )}
          <p className="text-center text-muted small mt-3">
            Mostrando {(pagina - 1) * POR_PAGINA + 1} -{" "}
            {Math.min(pagina * POR_PAGINA, productos.length)} de{" "}
            {productos.length} productos
          </p>
        </>
      )}
    </>
  );
}
