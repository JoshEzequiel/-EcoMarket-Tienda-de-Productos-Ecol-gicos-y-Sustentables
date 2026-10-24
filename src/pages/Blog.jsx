import { Link, useParams } from "react-router-dom";
import TituloPagina from "../components/TituloPagina";
import { articulos } from "../data/productos";
export default function Blog() {
  const { slug } = useParams();
  const articulo = slug ? articulos.find((a) => a.slug === slug) : null;
  if (slug && !articulo)
    return (
      <main className="container py-5">
        <h1>Articulo no encontrado</h1>
        <Link to="/blog">Volver</Link>
      </main>
    );
  if (articulo)
    return (
      <>
        <TituloPagina
          etiqueta="BLOG ECOLOGICO"
          titulo={articulo.titulo}
          descripcion={articulo.resumen}
        />
        <main className="container seccion py-5 ancho-blog">
          <Link to="/blog">← Todos los articulos</Link>
          <ol className="lista-blog mt-4">
            {articulo.contenido.map((linea, i) => (
              <li key={i}>{linea}</li>
            ))}
          </ol>
        </main>
      </>
    );
  return (
    <>
      <TituloPagina
        titulo="Ideas para un mundo verde"
        descripcion="Consejos y noticias sobre consumo responsable."
      />
      <main className="container seccion py-5">
        <div className="row g-4">
          {articulos.map((a, i) => (
            <div className="col-md-6" key={a.slug}>
              <article className="valor-card h-100">
                <span className="texto-etiqueta">
                  {i === 0 ? "VIDA SUSTENTABLE" : "CUIDADO PERSONAL"}
                </span>
                <h2>{a.titulo}</h2>
                <p>{a.resumen}</p>
                <Link className="enlace-ver" to={"/blog/" + a.slug}>
                  Leer articulo →
                </Link>
              </article>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
