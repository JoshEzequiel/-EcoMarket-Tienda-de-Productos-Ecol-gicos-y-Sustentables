import TituloPagina from "../components/TituloPagina";
import ContactoForm from "../components/ContactoForm";
import { useTienda } from "../context/TiendaContext";
export default function Contacto() {
  const { guardarMensaje } = useTienda();
  return (
    <>
      <TituloPagina
        titulo="Hablemos"
        descripcion="Tienes alguna pregunta? Nos encantaria leerte."
      />
      <main className="container seccion py-5">
        <div className="row g-5">
          <div className="col-lg-7">
            <div className="panel-blanco">
              <h2>Envianos un mensaje</h2>
              <ContactoForm onEnviar={guardarMensaje} />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="contacto-lado">
              <h2>EcoMarket</h2>
              <p>
                Somos una tienda Sustentable.
              </p>
              <p>📍 Santiago, Chile</p>
              <p>✉ contacto@ecomarket.cl</p>
              <p className="small">
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
