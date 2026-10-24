import { Link } from "react-router-dom";
import Logo from "./Logo";
export default function Footer() {
  return (
    <footer className="pie">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-5">
            <Logo />
            <p className="mt-3 texto-pie">
              Productos sustentables para pequeñas decisiones que hacen una gran
              diferencia.
            </p>
          </div>
          <div className="col-md-3">
            <h6>Navega</h6>
            <Link to="/productos">Productos</Link>
            <Link to="/categorias">Categorias</Link>
            <Link to="/ofertas">Ofertas</Link>
          </div>
          <div className="col-md-4">
            <h6>EcoMarket</h6>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
        </div>
        <hr />
        <div className="d-flex flex-wrap justify-content-between small opacity-75">
          <span>© 2026 EcoMarket - Proyecto Duoc UC</span>
          <span>Compra responsable · Cero Plastico</span>
        </div>
      </div>
    </footer>
  );
}
