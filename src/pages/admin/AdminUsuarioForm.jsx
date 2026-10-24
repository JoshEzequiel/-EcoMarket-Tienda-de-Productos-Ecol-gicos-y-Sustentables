import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTienda } from "../../context/TiendaContext";
import { validarRegistro, validarCorreo } from "../../utils/tienda";
const vacio = {
  run: "",
  nombre: "",
  apellido: "",
  email: "",
  region: "",
  comuna: "",
  direccion: "",
  password: "",
  rol: "Cliente",
};
export default function AdminUsuarioForm() {
  const { id } = useParams();
  const { usuarios, sesion, crearUsuario, editarUsuario } = useTienda();
  const encontrado = id ? usuarios.find((u) => u.id === Number(id)) : null;
  const [datos, setDatos] = useState(encontrado || vacio);
  const [error, setError] = useState("");
  const navegar = useNavigate();
  if (sesion.rol !== "Administrador")
    return (
      <p className="alert alert-warning">Acceso solo para administrador.</p>
    );
  if (id && !encontrado) return <p>Usuario no encontrado.</p>;
  function enviar(e) {
    e.preventDefault();
    const errores = validarRegistro(datos);
    if (Object.keys(errores).length) {
      setError(Object.values(errores)[0]);
      return;
    }
    if (!validarCorreo(datos.email)) {
      setError("Correo incorrecto.");
      return;
    }
    if (
      usuarios.some(
        (u) =>
          u.email.toLowerCase() === datos.email.toLowerCase() &&
          u.id !== Number(id),
      )
    ) {
      setError("El correo ya existe.");
      return;
    }
    if (
      usuarios.some(
        (u) =>
          u.run.replace(/\W/g, "") === datos.run.replace(/\W/g, "") &&
          u.id !== Number(id),
      )
    ) {
      setError("El RUN ya existe.");
      return;
    }
    if (id) editarUsuario(Number(id), datos);
    else crearUsuario(datos);
    navegar("/admin/usuarios");
  }
  const campos = [
    ["run", "RUN"],
    ["nombre", "Nombre"],
    ["apellido", "Apellido"],
    ["email", "Correo"],
    ["password", "Clave"],
    ["region", "Region"],
    ["comuna", "Comuna"],
    ["direccion", "Direccion"],
  ];
  return (
    <>
      <div className="admin-titulo">
        <span>ADMINISTRACION</span>
        <h1>{id ? "Editar usuario" : "Nuevo usuario"}</h1>
      </div>
      <div className="panel-blanco formulario-admin">
        <form onSubmit={enviar} noValidate>
          <div className="row g-3">
            {campos.map(([clave, titulo]) => (
              <div className="col-md-6" key={clave}>
                <label className="form-label" htmlFor={"u-" + clave}>
                  {titulo}
                </label>
                <input
                  id={"u-" + clave}
                  className="form-control"
                  type={clave === "password" ? "password" : "text"}
                  value={datos[clave]}
                  onChange={(e) =>
                    setDatos({ ...datos, [clave]: e.target.value })
                  }
                />
              </div>
            ))}
            <div className="col-md-6">
              <label className="form-label" htmlFor="u-rol">
                Rol
              </label>
              <select
                id="u-rol"
                className="form-select"
                value={datos.rol}
                onChange={(e) => setDatos({ ...datos, rol: e.target.value })}
              >
                <option>Cliente</option>
                <option>Vendedor</option>
                <option>Administrador</option>
              </select>
            </div>
          </div>
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
          <div className="d-flex gap-2 mt-4">
            <button className="boton-verde">Guardar usuario</button>
            <Link className="boton-outline" to="/admin/usuarios">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
