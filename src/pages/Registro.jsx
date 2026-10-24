import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTienda } from "../context/TiendaContext";
import { validarRegistro } from "../utils/tienda";
import TituloPagina from "../components/TituloPagina";
const inicial = {
  run: "",
  nombre: "",
  apellido: "",
  email: "",
  region: "",
  comuna: "",
  direccion: "",
  password: "",
};
export default function Registro() {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const { registrarUsuario } = useTienda();
  const navegar = useNavigate();
  function enviar(e) {
    e.preventDefault();
    const nuevos = validarRegistro(datos, true);
    setErrores(nuevos);
    if (Object.keys(nuevos).length) return;
    const error = registrarUsuario(datos);
    if (error) {
      setErrorGeneral(error);
      return;
    }
    navegar("/login");
  }
  function campo(nombre, texto, tipo = "text") {
    return (
      <div className="col-md-6" key={nombre}>
        <label className="form-label" htmlFor={"reg-" + nombre}>
          {texto}
        </label>
        <input
          id={"reg-" + nombre}
          type={tipo}
          className={"form-control " + (errores[nombre] ? "is-invalid" : "")}
          value={datos[nombre]}
          onChange={(e) => setDatos({ ...datos, [nombre]: e.target.value })}
        />
        {errores[nombre] && (
          <div className="invalid-feedback">{errores[nombre]}</div>
        )}
      </div>
    );
  }
  return (
    <>
      <TituloPagina
        titulo="Crear cuenta"
        descripcion="Unete a EcoMarket y comienza a comprar sustentable."
      />
      <main className="container py-5">
        <div className="panel-blanco mx-auto form-registro">
          <form onSubmit={enviar} noValidate>
            <div className="row g-3">
              {campo("run", "RUN (con digito verificador)")}
              {campo("nombre", "Nombre")}
              {campo("apellido", "Apellido")}
              {campo("email", "Correo", "email")}
              <div className="col-md-6">
                <label className="form-label" htmlFor="reg-region">
                  Region
                </label>
                <select
                  id="reg-region"
                  className={
                    "form-select " + (errores.region ? "is-invalid" : "")
                  }
                  value={datos.region}
                  onChange={(e) =>
                    setDatos({ ...datos, region: e.target.value })
                  }
                >
                  <option value="">Seleccionar</option>
                  <option>Metropolitana</option>
                  <option>Valparaiso</option>
                  <option>Bio Bio</option>
                  <option>Maule</option>
                  <option>Otra</option>
                </select>
                {errores.region && (
                  <div className="invalid-feedback">{errores.region}</div>
                )}
              </div>
              {campo("comuna", "Comuna")}
              {campo("direccion", "Direccion")}
              {campo("password", "Contrasena (4 a 10 caracteres)", "password")}
            </div>
            {errorGeneral && (
              <div role="alert" className="alert alert-danger mt-3">
                {errorGeneral}
              </div>
            )}
            <button className="boton-verde mt-4" type="submit">
              Crear mi cuenta
            </button>
          </form>
          <p className="mt-3">
            Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
          </p>
        </div>
      </main>
    </>
  );
}
