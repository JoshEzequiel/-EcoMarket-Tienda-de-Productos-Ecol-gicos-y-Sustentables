import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <Link
      className="logo text-decoration-none"
      to="/"
      aria-label="EcoMarket, ir al inicio"
    >
      <span className="logo-hoja">✳</span>
      <span>
        Eco<span className="logo-segundo">Market</span>
        <small>COMPRA CON PROPOSITO</small>
      </span>
    </Link>
  );
}
