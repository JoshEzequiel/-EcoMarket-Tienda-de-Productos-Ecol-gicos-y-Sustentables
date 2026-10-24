export default function TituloPagina({ etiqueta, titulo, descripcion }) {
  return (
    <section className="titulo-pagina">
      <div className="container">
        <span className="texto-etiqueta">{etiqueta || "EcoMarket"}</span>
        <h1>{titulo}</h1>
        {descripcion && <p>{descripcion}</p>}
      </div>
    </section>
  );
}
