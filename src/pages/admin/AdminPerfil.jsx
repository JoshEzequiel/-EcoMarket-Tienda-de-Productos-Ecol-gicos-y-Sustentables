import { useTienda } from "../../context/TiendaContext";
export default function AdminPerfil() {
  const { sesion } = useTienda();
  return (
    <>
      <div className="admin-titulo">
        <span>MI CUENTA</span>
        <h1>Perfil</h1>
      </div>
      <div className="panel-blanco formulario-centrado">
        <p>
          <b>Nombre:</b> {sesion.nombre} {sesion.apellido}
        </p>
        <p>
          <b>Correo:</b> {sesion.email}
        </p>
        <p>
          <b>Rol:</b> {sesion.rol}
        </p>
        <p className="text-muted small">
        </p>
      </div>
    </>
  );
}
