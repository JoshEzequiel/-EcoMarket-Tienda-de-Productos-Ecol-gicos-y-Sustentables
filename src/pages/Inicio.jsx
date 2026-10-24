import { Link } from "react-router-dom";
import { useTienda } from "../context/TiendaContext";
import Catalogo from "../components/Catalogo";
export default function Inicio() {
  const { productos, agregarCarrito } = useTienda();
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7 py-5">
              <span className="hero-badge">🌿 UN FUTURO MAS VERDE</span>
              <h1>
                Pequenos cambios,
                <br />
                <em>gran impacto.</em>
              </h1>
              <p>
                Descubre productos conscientes para vivir mejor y cuidar nuestro
                planeta. En EcoMarket creemos en una vida con menos residuos.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link className="boton-claro" to="/productos">
                  Explorar productos →
                </Link>
                <Link className="boton-hero-outline" to="/nosotros">
                  Conoce nuestra mision
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="hero-arte">
                <div className="circulo-uno" />
                <div className="circulo-dos" />
                <div className="hero-icono">🌎</div>
                <div className="tarjeta-flotante">
                  🌱 <span>100% buenas decisiones</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="beneficios">
        <div className="container">
          <div className="row g-3">
            <div className="col-md-4">
              ♻ &nbsp;<strong>Menos plastico</strong>
              <span> Alternativas reutilizables</span>
            </div>
            <div className="col-md-4">
              🚚 &nbsp;<strong>Envios a Chile</strong>
              <span> Compra desde tu hogar</span>
            </div>
            <div className="col-md-4">
              💚 &nbsp;<strong>Consumo responsable</strong>
              <span> Elige con proposito</span>
            </div>
          </div>
        </div>
      </section>
      <section className="seccion container py-5">
        <div className="cabecera-seccion">
          <div>
            <span className="texto-etiqueta">NUESTRA SELECCION</span>
            <h2>Productos destacados</h2>
            <p>Opciones favoritas para comenzar una rutina mas sustentable.</p>
          </div>
          <Link className="enlace-ver" to="/productos">
            Ver todos →
          </Link>
        </div>
        <Catalogo
          productos={productos.slice(0, 6)}
          onAgregar={agregarCarrito}
        />
      </section>
      <section className="bloque-cero">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-md-7">
              <span className="texto-etiqueta">NUESTRA INICIATIVA</span>
              <h2>Un Chile con menos plastico</h2>
              <p>
                Cambiar tus habitos no tiene que ser complicado. Reemplazar una
                bolsa o una botella desechable es un buen primer paso.
              </p>
              <Link
                className="boton-verde d-inline-block"
                to="/blog/reducir-plastico"
              >
                Leer nuestros consejos
              </Link>
            </div>
            <div className="col-md-5">
              <div className="ilustracion-cero">
                ♻
                <span>
                  CERO
                  <br />
                  PLASTICO
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
