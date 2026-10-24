import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Catalogo from "../components/Catalogo";
import TituloPagina from "../components/TituloPagina";
import { useTienda } from "../context/TiendaContext";
export default function Productos({ soloOfertas = false }) {
  const { productos, categorias, agregarCarrito } = useTienda();
  const [params, setParams] = useSearchParams();
  const [orden, setOrden] = useState("");
  const busqueda = params.get("q") || "";
  const categoria = params.get("categoria") || "";
  const filtrados = productos.filter(
    (p) =>
      (!soloOfertas || p.oferta) &&
      (!categoria || p.categoria === categoria) &&
      (!busqueda ||
        `${p.nombre} ${p.descripcion}`
          .toLowerCase()
          .includes(busqueda.toLowerCase())),
  );
  if (orden === "precio-menor") filtrados.sort((a, b) => a.precio - b.precio);
  if (orden === "precio-mayor") filtrados.sort((a, b) => b.precio - a.precio);
  function cambiarFiltro(nuevaCategoria) {
    const obj = {};
    if (busqueda) obj.q = busqueda;
    if (nuevaCategoria) obj.categoria = nuevaCategoria;
    setParams(obj);
  }
  return (
    <>
      <TituloPagina
        etiqueta="TIENDA SUSTENTABLE"
        titulo={soloOfertas ? "Ofertas verdes" : "Nuestros productos"}
        descripcion={
          soloOfertas
            ? "Productos con descuentos especiales."
            : "Encuentra productos que se adaptan a tu vida."
        }
      />
      <main className="container seccion py-5">
        <div className="row mb-4 g-3">
          <div className="col-md-5">
            <label
              className="form-label fw-semibold"
              htmlFor="filtrar-categoria"
            >
              Categoria
            </label>
            <select
              id="filtrar-categoria"
              className="form-select"
              value={categoria}
              onChange={(e) => cambiarFiltro(e.target.value)}
            >
              <option value="">Todas las categorias</option>
              {categorias.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold" htmlFor="orden">
              Ordenar
            </label>
            <select
              id="orden"
              className="form-select"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="">Destacados</option>
              <option value="precio-menor">Precio de menor a mayor</option>
              <option value="precio-mayor">Precio de mayor a menor</option>
            </select>
          </div>
          {busqueda && (
            <div className="col-md-3 d-flex align-items-end">
              <button className="boton-outline" onClick={() => setParams({})}>
                Limpiar: {busqueda} ×
              </button>
            </div>
          )}
        </div>
        <Catalogo productos={filtrados} onAgregar={agregarCarrito} />
      </main>
    </>
  );
}
