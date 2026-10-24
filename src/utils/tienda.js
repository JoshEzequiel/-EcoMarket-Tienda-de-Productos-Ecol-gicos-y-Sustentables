// aqui estan los calculos del carrito para usarlos tambien en los test
export function precioFinal(producto) {
  const descuento = producto.oferta ? Number(producto.descuento) || 0 : 0;
  return Math.round(Number(producto.precio) * (1 - descuento / 100));
}

export function resumenCarrito(carrito, productos, cupon = '') {
  const subtotal = carrito.reduce((suma, item) => {
    const producto = productos.find((p) => p.id === item.id);
    return suma + (producto ? precioFinal(producto) * item.cantidad : 0);
  }, 0);
  const descuento = cupon.trim().toUpperCase() === 'ECO10' ? Math.round(subtotal * 0.1) : 0;
  return { subtotal, descuento, total: subtotal - descuento };
}

export function validarRun(run) {
  const limpio = String(run).replace(/\./g, '').replace(/-/g, '').toUpperCase().trim();
  if (!/^\d{7,8}[\dK]$/.test(limpio)) return false;
  const cuerpo = limpio.slice(0, -1);
  const digito = limpio.slice(-1);
  let suma = 0;
  let multiplicador = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  const resto = 11 - (suma % 11);
  const esperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);
  return esperado === digito;
}

export function validarCorreo(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(correo).trim());
}

export function validarRegistro(datos, soloDominiosPermitidos = false) {
  const errores = {};
  if (!validarRun(datos.run)) errores.run = 'Ingresa un RUN valido.';
  if (!datos.nombre?.trim()) errores.nombre = 'El nombre es obligatorio.';
  if (!datos.apellido?.trim()) errores.apellido = 'El apellido es obligatorio.';
  if (!validarCorreo(datos.email)) errores.email = 'Ingresa un correo valido.';
  else if (soloDominiosPermitidos && !['gmail.com', 'duoc.cl', 'profesor.duoc.cl'].includes(datos.email.trim().toLowerCase().split('@')[1])) errores.email = 'Usa correo Gmail o Duoc.';
  if (!datos.region?.trim()) errores.region = 'Selecciona una region.';
  if (!datos.comuna?.trim()) errores.comuna = 'La comuna es obligatoria.';
  if (!datos.direccion?.trim()) errores.direccion = 'La direccion es obligatoria.';
  if ((datos.password || '').length < 4 || (datos.password || '').length > 10) errores.password = 'La clave debe tener entre 4 y 10 caracteres.';
  return errores;
}

export function formatearPesos(numero) {
  return '$' + Number(numero || 0).toLocaleString('es-CL');
}
