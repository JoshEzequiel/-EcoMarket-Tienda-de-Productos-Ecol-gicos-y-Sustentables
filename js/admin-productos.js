/* ============================================
   ADMIN-PRODUCTOS.JS
   Muestra los productos en la tabla del admin
   ============================================ */

// Esperamos que cargue toda la pagina
document.addEventListener('DOMContentLoaded', function () {

    // Tomamos el cuerpo de la tabla
    var listaProductos = document.getElementById('listaProductos');

    // Revisamos que tipo de usuario inicio sesion
    var usuarioActual = JSON.parse(
        localStorage.getItem('usuarioEcoMarket') || 'null'
    );

    var esVendedor = usuarioActual &&
                      usuarioActual.tipoUsuario === 'Vendedor';

    // El vendedor puede revisar productos, pero no modificarlos
    if (esVendedor) {

        var btnNuevo = document.getElementById('btnNuevoProducto');

        if (btnNuevo) {
            btnNuevo.style.display = 'none';
        }

        var linkInicioAdmin = document.getElementById('linkInicioAdmin');

        if (linkInicioAdmin) {
            linkInicioAdmin.style.display = 'none';
        }
    }

    // Si no encuentra la tabla, no hace nada
    if (!listaProductos) {
        return;
    }


    /* ============================================
       PRODUCTOS GUARDADOS
       ============================================ */

    // Buscamos los productos creados desde el administrador
    var productosGuardados = JSON.parse(
        localStorage.getItem('productosEcoMarket') || '[]'
    );


    // Creamos una lista donde juntaremos los productos
    var todosLosProductos = [];

    // Recuperamos los productos originales que fueron eliminados
    var productosEliminados = JSON.parse(
        localStorage.getItem('productosEliminados') || '[]'
    );


    // Primero agregamos los productos originales
    if (typeof productos !== 'undefined') {

        productos.forEach(function (producto) {

            // Solo mostramos el producto si no fue eliminado
            if (!productosEliminados.includes(producto.id)) {

                todosLosProductos.push(producto);

            }

        });

    }


    // Despues agregamos los productos creados por el administrador
    productosGuardados.forEach(function (producto) {

        todosLosProductos.push(producto);

    });


    /* ============================================
       NOMBRE DE LA CATEGORIA
       ============================================ */

    function obtenerCategoria(categoria) {

        if (categoria === 'cuidado') {
            return 'Cuidado Personal';
        }

        if (categoria === 'alimentos') {
            return 'Alimentos Organicos';
        }

        if (categoria === 'vestimenta') {
            return 'Vestimenta Sustentable';
        }

        if (categoria === 'tecnologia') {
            return 'Tecnologia Eco';
        }

        return categoria;
    }


    /* ============================================
       MOSTRAR PRODUCTOS
       ============================================ */

    function mostrarProductos() {

        // Limpiamos la tabla
        listaProductos.innerHTML = '';


        // Si no hay productos mostramos un mensaje
        if (todosLosProductos.length === 0) {

            listaProductos.innerHTML =
                '<tr>' +
                    '<td colspan="6">No hay productos registrados.</td>' +
                '</tr>';

            return;
        }


        // Recorremos todos los productos
        todosLosProductos.forEach(function (producto) {

            // Creamos una fila
            var fila = document.createElement('tr');


            /* ============================================
               STOCK CRITICO
               ============================================ */

            var textoStock = producto.stock;

            // Si tiene stock critico y el stock actual es menor o igual
            if (
                producto.stockCritico !== undefined &&
                producto.stock <= producto.stockCritico
            ) {

                textoStock =
                    '<span class="stock-critico">' +
                        producto.stock + ' - Stock critico' +
                    '</span>';

            }


            /* ============================================
               CATEGORIA
               ============================================ */

            var categoriaTexto;

            // Los productos originales ya tienen etiquetaCategoria
            if (producto.etiquetaCategoria) {

                categoriaTexto = producto.etiquetaCategoria;

            } else {

                // Los productos nuevos usan solamente categoria
                categoriaTexto = obtenerCategoria(producto.categoria);

            }


            /* ============================================
               FILA DE LA TABLA
               ============================================ */

            fila.innerHTML =

                '<td>' + producto.codigo + '</td>' +

                '<td>' + producto.nombre + '</td>' +

                '<td>$' + producto.precio.toLocaleString('es-CL') + '</td>' +

                '<td>' + textoStock + '</td>' +

                '<td>' + categoriaTexto + '</td>' +

                '<td>' +

                    (esVendedor
                        ? '<a href="detalle-producto.html?id=' + producto.id + '" class="btn-editar">Ver</a>'
                        : '<a href="admin-editar-producto.html?id=' + producto.id + '" class="btn-editar">Editar</a> ' +
                          '<button class="btn-eliminar" onclick="eliminarProducto(' + producto.id + ')">Eliminar</button>'
                    ) +

                '</td>';


            // Agregamos la fila a la tabla
            listaProductos.appendChild(fila);

        });

    }


    // Ejecutamos la funcion
    mostrarProductos();

});


/* ============================================
   ELIMINAR PRODUCTO
   ============================================ */

function eliminarProducto(id) {

    // Preguntamos antes de eliminar
    var confirmar = confirm('¿Seguro que quieres eliminar este producto?');

    // Si presiona cancelar, no hacemos nada
    if (!confirmar) {
        return;
    }


    // Buscamos los productos creados desde el administrador
    var productosGuardados = JSON.parse(
        localStorage.getItem('productosEcoMarket') || '[]'
    );


    // Buscamos si el producto esta dentro de los productos nuevos
    var productoGuardado = productosGuardados.find(function (producto) {
        return producto.id === id;
    });


    // Si es un producto creado desde administrador
    if (productoGuardado) {

        // Dejamos todos menos el producto que queremos eliminar
        productosGuardados = productosGuardados.filter(function (producto) {
            return producto.id !== id;
        });

        // Guardamos nuevamente la lista
        localStorage.setItem(
            'productosEcoMarket',
            JSON.stringify(productosGuardados)
        );

    } else {

        /* ============================================
           PRODUCTOS ORIGINALES
           ============================================ */

        // Los productos originales estan en productos-data.js
        // Por eso guardamos su ID como eliminado

        var productosEliminados = JSON.parse(
            localStorage.getItem('productosEliminados') || '[]'
        );


        // Revisamos que no este guardado anteriormente
        if (!productosEliminados.includes(id)) {

            productosEliminados.push(id);

        }


        // Guardamos los productos eliminados
        localStorage.setItem(
            'productosEliminados',
            JSON.stringify(productosEliminados)
        );
    }


    // Mensaje para el usuario
    alert('Producto eliminado correctamente.');


    // Recargamos la pagina para actualizar la tabla
    location.reload();

}