import { Link } from "react-router-dom";
import { useTienda } from "../../context/TiendaContext";
export default function AdminUsuarios() {
  const { usuarios, eliminarUsuario, sesion } = useTienda();
  if (sesion.rol !== "Administrador")
    return (
      <div className="alert alert-warning">Acceso solo para administrador.</div>
    );
  function borrar(usuario) {
    if (usuario.id === sesion.id) {
      window.alert("No puedes eliminar tu propia cuenta.");
      return;
    }
    if (window.confirm("Eliminar usuario " + usuario.nombre + "?"))
      eliminarUsuario(usuario.id);
  }
  return (
    <>
      <div className="admin-titulo">
        <span>ADMINISTRACION</span>
        <h1>Usuarios</h1>
      </div>
      <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
        <span>Listado de usuarios</span>
        <Link className="boton-verde" to="/admin/usuarios/nuevo">
          + Nuevo usuario
        </Link>
      </div>
      <div className="panel-blanco p-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table tabla-admin align-middle mb-0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>
                    {u.nombre} {u.apellido}
                  </td>
                  <td>{u.email}</td>
                  <td>{u.rol}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link
                        className="btn btn-sm btn-outline-success"
                        to={"/admin/usuarios/editar/" + u.id}
                      >
                        Editar
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => borrar(u)}
                      >
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
