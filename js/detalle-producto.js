/* ============================================
   DETALLE-PRODUCTO.JS
   Muestra el producto seleccionado por su ID
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // Leemos el ID que viene en la URL
    // Ejemplo: detalle-producto.html?id=2
    var parametros = new URLSearchParams(window.location.search);
    var idProducto = Number(parametros.get('id'));

    // Obtenemos productos originales y cambios hechos desde Admin
    var productosActuales = obtenerProductosActuales();

    // Buscamos el producto que tenga el mismo ID
    var producto = productosActuales.find(function (p) {
        return p.id === idProducto;
    });

    // Si no existe mostramos un mensaje
    if (!producto) {
        document.getElementById('detalleProducto').innerHTML =
            '<h2>Producto no encontrado</h2>';
        return;
    }

    // Mostramos los datos del producto
    document.getElementById('detalleImagen').src = producto.imagen;
    document.getElementById('detalleImagen').alt = producto.nombre;
    document.getElementById('detalleCategoria').textContent = producto.etiquetaCategoria;
    document.getElementById('detalleNombre').textContent = producto.nombre;
    document.getElementById('detalleDescripcion').textContent = producto.desc;
    document.getElementById('detallePrecio').textContent =
        producto.precio.toLocaleString('es-CL');
    document.getElementById('detallePrecioAntes').textContent =
        producto.precioAntes.toLocaleString('es-CL');

    // Boton para agregar este producto al carrito
    document.getElementById('btnAgregarDetalle').addEventListener('click', function () {
        agregarAlCarrito(producto.id);
    });

});
