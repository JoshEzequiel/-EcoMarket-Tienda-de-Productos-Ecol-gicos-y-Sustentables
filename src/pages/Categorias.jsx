import { Link } from "react-router-dom";
import TituloPagina from "../components/TituloPagina";
import { useTienda } from "../context/TiendaContext";
export default function Categorias() {
  const { categorias, productos } = useTienda();
  return (
    <>
      <TituloPagina
        titulo="Compra por categoria"
        descripcion="Encuentra lo que necesitas de forma sencilla."
      />
      <main className="container seccion py-5">
        <div className="row g-4">
          {categorias.map((cat, index) => (
            <div className="col-md-6 col-lg-4" key={cat}>
              <Link
                className="categoria-tarjeta"
                to={"/productos?categoria=" + encodeURIComponent(cat)}
              >
                <span className="categoria-icono">
                  {["♻", "🧼", "🥗", "👕", "☀"][index % 5]}
                </span>
                <h3>{cat}</h3>
                <p>
                  {productos.filter((p) => p.categoria === cat).length}{" "}
                  productos
                </p>
                <span>Explorar →</span>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
