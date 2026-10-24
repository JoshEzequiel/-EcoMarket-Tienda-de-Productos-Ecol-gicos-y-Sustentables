import { NavLink, Outlet } from "react-router-dom";
import { useTienda } from "../../context/TiendaContext";
export default function AdminLayout() {
  const { sesion } = useTienda();
  const opciones = [
    ["/admin", "Resumen"],
    ["/admin/productos", "Productos"],
    ["/admin/pedidos", "Ordenes"],
    ["/admin/categorias", "Categorias"],
    ["/admin/usuarios", "Usuarios"],
    ["/admin/reportes", "Reportes"],
    ["/admin/perfil", "Mi perfil"],
  ];
  const visibles =
    sesion?.rol === "Vendedor"
      ? opciones.filter(([, n]) =>
          ["Resumen", "Productos", "Mi perfil"].includes(n),
        )
      : opciones;
  return (
    <main className="container-fluid contenedor-admin">
      <div className="row">
        <aside className="col-lg-2 admin-lateral">
          <h2 className="h5 mb-4">Panel EcoMarket</h2>
          <span className="admin-rol">{sesion.rol}</span>
          <nav className="d-flex flex-column gap-1 mt-3">
            {visibles.map(([ruta, nombre]) => (
              <NavLink
                key={ruta}
                to={ruta}
                end={ruta === "/admin"}
                className={({ isActive }) =>
                  "admin-link " + (isActive ? "admin-activo" : "")
                }
              >
                {nombre}
              </NavLink>
            ))}
          </nav>
        </aside>
        <section className="col-lg-10 admin-contenido">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
