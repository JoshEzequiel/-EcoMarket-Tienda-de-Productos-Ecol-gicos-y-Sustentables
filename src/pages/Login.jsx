import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTienda } from "../context/TiendaContext";
import TituloPagina from "../components/TituloPagina";
export default function Login() {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const { iniciarSesion, usuarios } = useTienda();
  const navegar = useNavigate();
  function ingresar(e) {
    e.preventDefault();
    if (!iniciarSesion(email, clave)) {
      setError("Correo o clave incorrectos.");
      return;
    }
    const tipo = usuarios.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
    )?.rol;
    navegar(tipo === "Administrador" || tipo === "Vendedor" ? "/admin" : "/");
  }
  return (
    <>
      <TituloPagina
        titulo="Iniciar sesion"
        descripcion="Ingresa a tu cuenta de EcoMarket"
      />
      <main className="container py-5">
        <div className="panel-blanco formulario-centrado">
          <form onSubmit={ingresar}>
            <div className="mb-3">
              <label htmlFor="login-email" className="form-label">
                Correo
              </label>
              <input
                id="login-email"
                className="form-control"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="login-clave" className="form-label">
                Contrasena
              </label>
              <input
                id="login-clave"
                className="form-control"
                type="password"
                required
                value={clave}
                onChange={(e) => setClave(e.target.value)}
              />
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <button className="boton-verde w-100" type="submit">
              Entrar
            </button>
          </form>
          <p className="mt-4 mb-0 text-center">
            No tienes cuenta? <Link to="/registro">Registrate aqui</Link>
          </p>
          <div className="aviso-suave mt-4 small">
            <b>Usuarios para probar:</b>
            <div>Administrador: admin@ecomarket.cl / Admin123</div>
            <div>Vendedor: ventas@ecomarket.cl / Ventas123</div>
            <div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
