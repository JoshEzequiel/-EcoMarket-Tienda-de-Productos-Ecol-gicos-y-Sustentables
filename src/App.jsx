import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Categorias from './pages/Categorias';
import Nosotros from './pages/Nosotros';
import Blog from './pages/Blog';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import ResultadoCompra from './pages/ResultadoCompra';
import AdminLayout from './pages/admin/AdminLayout';
import AdminInicio from './pages/admin/AdminInicio';
import AdminProductos from './pages/admin/AdminProductos';
import AdminProductoForm from './pages/admin/AdminProductoForm';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminUsuarioForm from './pages/admin/AdminUsuarioForm';
import AdminCategorias from './pages/admin/AdminCategorias';
import AdminPedidos from './pages/admin/AdminPedidos';
import AdminReportes from './pages/admin/AdminReportes';
import AdminPerfil from './pages/admin/AdminPerfil';
import { useTienda } from './context/TiendaContext';

function Proteccion({ children }) {
  const { sesion } = useTienda();
  return sesion && ['Administrador','Vendedor'].includes(sesion.rol) ? children : <Navigate to="/login" replace />;
}
export default function App() {
  return <><Header/><Routes>
    <Route path="/" element={<Inicio/>}/>
    <Route path="/productos" element={<Productos/>}/>
    <Route path="/productos/:id" element={<DetalleProducto/>}/>
    <Route path="/categorias" element={<Categorias/>}/>
    <Route path="/ofertas" element={<Productos soloOfertas/>}/>
    <Route path="/nosotros" element={<Nosotros/>}/>
    <Route path="/blog" element={<Blog/>}/>
    <Route path="/blog/:slug" element={<Blog/>}/>
    <Route path="/contacto" element={<Contacto/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/registro" element={<Registro/>}/>
    <Route path="/carrito" element={<Carrito/>}/>
    <Route path="/checkout" element={<Checkout/>}/>
    <Route path="/compra/:tipo" element={<ResultadoCompra/>}/>
    <Route path="/admin" element={<Proteccion><AdminLayout/></Proteccion>}>
      <Route index element={<AdminInicio/>}/>
      <Route path="productos" element={<AdminProductos/>}/>
      <Route path="productos/nuevo" element={<AdminProductoForm/>}/>
      <Route path="productos/editar/:id" element={<AdminProductoForm/>}/>
      <Route path="usuarios" element={<AdminUsuarios/>}/>
      <Route path="usuarios/nuevo" element={<AdminUsuarioForm/>}/>
      <Route path="usuarios/editar/:id" element={<AdminUsuarioForm/>}/>
      <Route path="categorias" element={<AdminCategorias/>}/>
      <Route path="pedidos" element={<AdminPedidos/>}/>
      <Route path="reportes" element={<AdminReportes/>}/>
      <Route path="perfil" element={<AdminPerfil/>}/>
    </Route>
    <Route path="*" element={<main className="container py-5"><h1>Pagina no encontrada</h1><a href="/">Volver al inicio</a></main>}/>
  </Routes><Footer/></>;
}
