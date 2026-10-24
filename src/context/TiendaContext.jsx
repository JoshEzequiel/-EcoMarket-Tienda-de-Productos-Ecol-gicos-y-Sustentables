import { createContext, useContext, useEffect, useState } from "react";
import {
  productosIniciales,
  usuariosIniciales,
  categoriasIniciales,
} from "../data/productos";
import { leerDato, guardarDato } from "../data/almacenamiento";
import {
  crearRegistro,
  editarRegistro,
  eliminarRegistro,
} from "../data/operaciones";
import { resumenCarrito } from "../utils/tienda";

const TiendaContext = createContext(null);
export const useTienda = () => useContext(TiendaContext);

export function TiendaProvider({ children }) {
  const [productos, setProductos] = useState(() =>
    leerDato("eco2_productos", productosIniciales),
  );
  const [usuarios, setUsuarios] = useState(() =>
    leerDato("eco2_usuarios", usuariosIniciales),
  );
  const [categorias, setCategorias] = useState(() =>
    leerDato("eco2_categorias", categoriasIniciales),
  );
  const [carrito, setCarrito] = useState(() => leerDato("eco2_carrito", []));
  const [cupon, setCupon] = useState(() => leerDato("eco2_cupon", ""));
  const [sesion, setSesion] = useState(() => leerDato("eco2_sesion", null));
  const [pedidos, setPedidos] = useState(() => leerDato("eco2_pedidos", []));
  const [mensajes, setMensajes] = useState(() => leerDato("eco2_mensajes", []));
  const [ultimoResultado, setUltimoResultado] = useState(() =>
    leerDato("eco2_resultado", null),
  );

  useEffect(() => guardarDato("eco2_productos", productos), [productos]);
  useEffect(() => guardarDato("eco2_usuarios", usuarios), [usuarios]);
  useEffect(() => guardarDato("eco2_categorias", categorias), [categorias]);
  useEffect(() => guardarDato("eco2_carrito", carrito), [carrito]);
  useEffect(() => guardarDato("eco2_cupon", cupon), [cupon]);
  useEffect(() => guardarDato("eco2_sesion", sesion), [sesion]);
  useEffect(() => guardarDato("eco2_pedidos", pedidos), [pedidos]);
  useEffect(() => guardarDato("eco2_mensajes", mensajes), [mensajes]);
  useEffect(
    () => guardarDato("eco2_resultado", ultimoResultado),
    [ultimoResultado],
  );

  // cuando se modifica el stock se revisan las cantidades del carrito
  useEffect(() => {
    setCarrito((items) =>
      items
        .filter((item) =>
          productos.some((p) => p.id === item.id && p.stock > 0),
        )
        .map((item) => ({
          ...item,
          cantidad: Math.min(
            item.cantidad,
            productos.find((p) => p.id === item.id).stock,
          ),
        })),
    );
  }, [productos]);

  function agregarCarrito(id) {
    const producto = productos.find((p) => p.id === id);
    if (!producto || producto.stock <= 0) return false;
    const actual = carrito.find((item) => item.id === id)?.cantidad || 0;
    if (actual >= producto.stock) return false;
    setCarrito((lista) =>
      lista.some((item) => item.id === id)
        ? lista.map((item) =>
            item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item,
          )
        : [...lista, { id, cantidad: 1 }],
    );
    return true;
  }
  function cambiarCantidad(id, cantidad) {
    const producto = productos.find((p) => p.id === id);
    const numero = Number(cantidad);
    if (!producto || !Number.isInteger(numero)) return;
    if (numero <= 0) {
      setCarrito((lista) => lista.filter((item) => item.id !== id));
      return;
    }
    setCarrito((lista) =>
      lista.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.min(numero, producto.stock) }
          : item,
      ),
    );
  }
  function registrarUsuario(datos) {
    if (
      usuarios.some(
        (u) => u.email.toLowerCase() === datos.email.trim().toLowerCase(),
      )
    )
      return "Este correo ya esta registrado.";
    if (
      usuarios.some(
        (u) => u.run.replace(/\W/g, "") === datos.run.replace(/\W/g, ""),
      )
    )
      return "Este RUN ya esta registrado.";
    setUsuarios((lista) =>
      crearRegistro(lista, {
        ...datos,
        email: datos.email.trim().toLowerCase(),
        rol: "Cliente",
      }),
    );
    return "";
  }
  function iniciarSesion(email, clave) {
    const usuario = usuarios.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === clave,
    );
    if (!usuario) return false;
    const { password, ...usuarioVisible } = usuario;
    setSesion(usuarioVisible);
    return true;
  }
  function comprar(datos, aprobado) {
    if (!carrito.length) return null;
    const resumen = resumenCarrito(carrito, productos, cupon);
    const detalle = carrito.map((item) => {
      const producto = productos.find((p) => p.id === item.id);
      return {
        id: item.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: item.cantidad,
      };
    });
    const pedido = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      cliente: datos,
      items: detalle,
      ...resumen,
      estado: aprobado ? "Aprobada" : "Rechazada",
    };
    setPedidos((lista) => [pedido, ...lista]);
    setUltimoResultado(pedido);
    if (aprobado) {
      setProductos((lista) =>
        lista.map((p) => {
          const item = carrito.find((c) => c.id === p.id);
          return item
            ? { ...p, stock: Math.max(0, p.stock - item.cantidad) }
            : p;
        }),
      );
      setCarrito([]);
      setCupon("");
    }
    return pedido;
  }
  const valor = {
    productos,
    usuarios,
    categorias,
    carrito,
    cupon,
    setCupon,
    sesion,
    setSesion,
    pedidos,
    mensajes,
    ultimoResultado,
    resumen: resumenCarrito(carrito, productos, cupon),
    agregarCarrito,
    cambiarCantidad,
    quitarCarrito: (id) =>
      setCarrito((lista) => lista.filter((item) => item.id !== id)),
    registrarUsuario,
    iniciarSesion,
    cerrarSesion: () => setSesion(null),
    comprar,
    crearProducto: (datos) =>
      setProductos((lista) => crearRegistro(lista, datos)),
    editarProducto: (id, datos) =>
      setProductos((lista) => editarRegistro(lista, id, datos)),
    eliminarProducto: (id) =>
      setProductos((lista) => eliminarRegistro(lista, id)),
    crearUsuario: (datos) =>
      setUsuarios((lista) => crearRegistro(lista, datos)),
    editarUsuario: (id, datos) => {
      setUsuarios((lista) => editarRegistro(lista, id, datos));
      if (sesion?.id === id)
        setSesion((anterior) => ({ ...anterior, ...datos, id }));
    },
    eliminarUsuario: (id) =>
      setUsuarios((lista) => eliminarRegistro(lista, id)),
    agregarCategoria: (nueva) =>
      setCategorias((lista) =>
        lista.includes(nueva) ? lista : [...lista, nueva],
      ),
    quitarCategoria: (nombre) =>
      setCategorias((lista) => lista.filter((cat) => cat !== nombre)),
    renombrarCategoria: (vieja, nueva) => {
      setCategorias((lista) =>
        lista.map((cat) => (cat === vieja ? nueva : cat)),
      );
      setProductos((lista) =>
        lista.map((p) =>
          p.categoria === vieja ? { ...p, categoria: nueva } : p,
        ),
      );
    },
    guardarMensaje: (datos) =>
      setMensajes((lista) => [
        ...lista,
        { ...datos, fecha: new Date().toISOString() },
      ]),
    reiniciarDemo: () => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("eco2_"))
        .forEach((k) => localStorage.removeItem(k));
      window.location.assign("/");
    },
  };
  return (
    <TiendaContext.Provider value={valor}>{children}</TiendaContext.Provider>
  );
}
