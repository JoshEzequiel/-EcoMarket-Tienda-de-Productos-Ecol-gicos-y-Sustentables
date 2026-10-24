import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTienda } from "../context/TiendaContext";
import Logo from "./Logo";
export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const { carrito, sesion, cerrarSesion } = useTienda();
  const navegar = useNavigate();
  const cantidad = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const menu = [
    ["/", "Inicio"],
    ["/productos", "Productos"],
    ["/categorias", "Categorias"],
    ["/ofertas", "Ofertas"],
    ["/nosotros", "Nosotros"],
    ["/blog", "Blog"],
    ["/contacto", "Contacto"],
  ];
  function buscar(e) {
    e.preventDefault();
    navegar("/productos?q=" + encodeURIComponent(busqueda.trim()));
    setAbierto(false);
  }
  return (
    <>
      <div className="cinta-superior">
        Envios a todo Chile · Productos que cuidan nuestro planeta · Cupon{" "}
        <strong>ECO10</strong>
      </div>
      <header className="cabecera sticky-top">
        <div className="container py-3">
          <div className="d-flex align-items-center justify-content-between gap-3">
            <Logo />
            <form
              className="buscador d-none d-md-flex"
              onSubmit={buscar}
              role="search"
            >
              <input
                aria-label="Buscar productos"
                placeholder="Que producto buscas?"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button aria-label="Buscar" type="submit">
                ⌕
              </button>
            </form>
            <div className="d-flex align-items-center gap-2">
              {sesion ? (
                <div className="menu-usuario">
                  <span className="text-muted small d-none d-lg-inline">
                    Hola, {sesion.nombre}
                  </span>
                  {(sesion.rol === "Administrador" ||
                    sesion.rol === "Vendedor") && (
                    <Link to="/admin" className="boton-outline btn-sm">
                      Panel
                    </Link>
                  )}
                  <button
                    className="boton-outline btn-sm"
                    onClick={cerrarSesion}
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <Link to="/login" className="boton-outline btn-sm">
                  Ingresar
                </Link>
              )}
              <Link className="boton-carrito" to="/carrito">
                🛒 <span className="d-none d-sm-inline">Carrito</span>{" "}
                <span className="cantidad">{cantidad}</span>
              </Link>
              <button
                className="btn menu-movil d-lg-none"
                aria-label="Abrir menu"
                aria-expanded={abierto}
                onClick={() => setAbierto(!abierto)}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
        <nav
          className={"menu-principal " + (abierto ? "menu-abierto" : "")}
          aria-label="Menu principal"
        >
          <div className="container d-lg-flex gap-4 align-items-center">
            {menu.map(([ruta, nombre]) => (
              <NavLink
                end={ruta === "/"}
                key={ruta}
                to={ruta}
                onClick={() => setAbierto(false)}
                className={({ isActive }) =>
                  isActive ? "enlace-menu activo" : "enlace-menu"
                }
              >
                {nombre}
              </NavLink>
            ))}
            <form className="d-flex d-md-none pb-3" onSubmit={buscar}>
              <input
                className="form-control"
                placeholder="Buscar"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button className="btn btn-success ms-2">Buscar</button>
            </form>
          </div>
        </nav>
      </header>
    </>
  );
}
