import TituloPagina from "../components/TituloPagina";
export default function Nosotros() {
  return (
    <>
      <TituloPagina
        etiqueta="CONOCE NUESTRA HISTORIA"
        titulo="Sobre EcoMarket"
        descripcion="Una tienda creada para incentivar el consumo responsable."
      />
      <main className="container seccion py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="texto-etiqueta">QUIENES SOMOS</span>
            <h2>Nuestro proposito es cuidar el planeta</h2>
            <p>
              EcoMarket es una pyme ficticia que ofrece alternativas
              sustentables para el hogar, la higiene personal, los alimentos y
              la tecnologia. Queremos que comprar de manera responsable sea mas
              facil.
            </p>
            <p>
              Buscamos disminuir los residuos, promover la iniciativa Cero
              Plastico y acercar productos reutilizables a familias de Chile.
            </p>
            <div className="aviso-suave">
              Proyecto educativo de Desarrollo FullStack II - Duoc UC.
            </div>
          </div>
          <div className="col-lg-6">
            <div className="nosotros-arte">
              🌿
              <span>
                Comprometidos
                <br />
                con un futuro verde
              </span>
            </div>
          </div>
        </div>
        <div className="row g-4 mt-4">
          <div className="col-md-4">
            <div className="valor-card">
              <h3>♻ Reutilizar</h3>
              <p>Elegir productos que generan menos residuos.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="valor-card">
              <h3>💚 Cuidar</h3>
              <p>Pensar en el impacto de nuestras decisiones.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="valor-card">
              <h3>🌎 Aprender</h3>
              <p>Compartir informacion para consumir mejor.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
