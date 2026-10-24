import { useState } from "react";
import { validarCorreo } from "../utils/tienda";
const vacio = { nombre: "", email: "", mensaje: "" };

export default function ContactoForm({ onEnviar }) {
  const [datos, setDatos] = useState(vacio);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);
  function enviar(e) {
    e.preventDefault();
    setExito(false);
    if (
      !datos.nombre.trim() ||
      !datos.mensaje.trim() ||
      !validarCorreo(datos.email)
    ) {
      setError("Completa nombre, correo valido y mensaje.");
      return;
    }
    onEnviar(datos);
    setDatos(vacio);
    setError("");
    setExito(true);
  }
  return (
    <form noValidate onSubmit={enviar}>
      <div className="mb-3">
        <label htmlFor="contacto-nombre" className="form-label">
          Tu nombre
        </label>
        <input
          id="contacto-nombre"
          className="form-control"
          value={datos.nombre}
          onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="contacto-email" className="form-label">
          Correo electronico
        </label>
        <input
          id="contacto-email"
          type="email"
          className="form-control"
          value={datos.email}
          onChange={(e) => setDatos({ ...datos, email: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="contacto-mensaje" className="form-label">
          Mensaje
        </label>
        <textarea
          id="contacto-mensaje"
          rows="5"
          className="form-control"
          value={datos.mensaje}
          onChange={(e) => setDatos({ ...datos, mensaje: e.target.value })}
        />
      </div>
      {error && (
        <div role="alert" className="alert alert-danger">
          {error}
        </div>
      )}
      {exito && (
        <div role="status" className="alert alert-success">
          Mensaje guardado correctamente (simulacion local).
        </div>
      )}
      <button type="submit" className="boton-verde">
        Enviar mensaje
      </button>
    </form>
  );
}
