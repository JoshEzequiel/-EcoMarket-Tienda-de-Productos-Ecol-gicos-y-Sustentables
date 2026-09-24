/* ============================================
   ADMIN-EDITAR-PRODUCTO.JS
   Carga y modifica un producto
   ============================================ */

// Esperamos que cargue toda la pagina
document.addEventListener('DOMContentLoaded', function () {

    // Tomamos el formulario
    var form = document.getElementById('editarProductoForm');

    // Si no encuentra el formulario, no hace nada
    if (!form) {
        return;
    }


    /* ============================================
       OBTENER ID DEL PRODUCTO
       ============================================ */

    // Leemos el ID que viene en la URL
    // Ejemplo: admin-editar-producto.html?id=2
    var parametros = new URLSearchParams(window.location.search);

    var idProducto = Number(parametros.get('id'));


    /* ============================================
       CAMPOS DEL FORMULARIO
       ============================================ */

    var codigo = document.getElementById('codigo');
    var nombre = document.getElementById('nombreProducto');
    var descripcion = document.getElementById('descripcion');
    var precio = document.getElementById('precio');
    var stock = document.getElementById('stock');
    var stockCritico = document.getElementById('stockCritico');
    var categoria = document.getElementById('categoria');
    var imagen = document.getElementById('imagen');


    // Mensajes de error
    var codigoError = document.getElementById('codigoError');
    var nombreError = document.getElementById('nombreProductoError');
    var descripcionError = document.getElementById('descripcionError');
    var precioError = document.getElementById('precioError');
    var stockError = document.getElementById('stockError');
    var stockCriticoError = document.getElementById('stockCriticoError');
    var categoriaError = document.getElementById('categoriaError');


    /* ============================================
       BUSCAR PRODUCTO
       ============================================ */

    // Productos creados desde el administrador
    var productosGuardados = JSON.parse(
        localStorage.getItem('productosEcoMarket') || '[]'
    );


    // Primero buscamos si esta guardado en localStorage
    var producto = productosGuardados.find(function (p) {
        return p.id === idProducto;
    });


    // Si no esta en localStorage, buscamos en los productos originales
    if (!producto && typeof productos !== 'undefined') {

        producto = productos.find(function (p) {
            return p.id === idProducto;
        });

    }


    // Si no encontramos el producto
    if (!producto) {

        alert('Producto no encontrado.');

        window.location.href = 'admin-productos.html';

        return;
    }


    /* ============================================
       MOSTRAR DATOS EN EL FORMULARIO
       ============================================ */

    codigo.value = producto.codigo || '';

    nombre.value = producto.nombre || '';

    // Los productos originales usan "desc"
    // y los nuevos usan "descripcion"
    descripcion.value =
        producto.descripcion || producto.desc || '';

    precio.value = producto.precio;

    stock.value = producto.stock;

    stockCritico.value = producto.stockCritico;

    categoria.value = producto.categoria;

    imagen.value = producto.imagen || '';


    /* ============================================
       GUARDAR LOS CAMBIOS
       ============================================ */

    form.addEventListener('submit', function (e) {

        // Evitamos que la pagina se recargue
        e.preventDefault();

        var valido = true;


        /* CODIGO */

        if (codigo.value.trim() === '') {

            codigoError.textContent = 'El codigo es obligatorio.';
            valido = false;

        } else if (codigo.value.trim().length < 3) {

            codigoError.textContent = 'El codigo debe tener minimo 3 caracteres.';
            valido = false;

        } else {

            codigoError.textContent = '';
        }


        /* NOMBRE */

        if (nombre.value.trim() === '') {

            nombreError.textContent = 'El nombre es obligatorio.';
            valido = false;

        } else if (nombre.value.trim().length > 100) {

            nombreError.textContent = 'El nombre no puede superar los 100 caracteres.';
            valido = false;

        } else {

            nombreError.textContent = '';
        }


        /* DESCRIPCION */

        if (descripcion.value.length > 500) {

            descripcionError.textContent =
                'La descripcion no puede superar los 500 caracteres.';

            valido = false;

        } else {

            descripcionError.textContent = '';
        }


        /* PRECIO */

        if (precio.value === '') {

            precioError.textContent = 'El precio es obligatorio.';
            valido = false;

        } else if (parseFloat(precio.value) < 0) {

            precioError.textContent = 'El precio no puede ser menor a 0.';
            valido = false;

        } else {

            precioError.textContent = '';
        }


        /* STOCK */

        if (stock.value === '') {

            stockError.textContent = 'El stock es obligatorio.';
            valido = false;

        } else if (parseInt(stock.value) < 0) {

            stockError.textContent = 'El stock no puede ser menor a 0.';
            valido = false;

        } else if (!Number.isInteger(Number(stock.value))) {

            stockError.textContent = 'El stock debe ser un numero entero.';
            valido = false;

        } else {

            stockError.textContent = '';
        }


        /* STOCK CRITICO */

        if (stockCritico.value !== '') {

            if (parseInt(stockCritico.value) < 0) {

                stockCriticoError.textContent =
                    'El stock critico no puede ser menor a 0.';

                valido = false;

            } else if (!Number.isInteger(Number(stockCritico.value))) {

                stockCriticoError.textContent =
                    'El stock critico debe ser un numero entero.';

                valido = false;

            } else {

                stockCriticoError.textContent = '';
            }

        } else {

            stockCriticoError.textContent = '';
        }


        /* CATEGORIA */

        if (categoria.value === '') {

            categoriaError.textContent = 'Selecciona una categoria.';
            valido = false;

        } else {

            categoriaError.textContent = '';
        }


        // Si encontramos errores, no continuamos
        if (!valido) {

            alert('Revisa los datos del formulario.');

            return;
        }


        /* ============================================
           PRODUCTO MODIFICADO
           ============================================ */

        var productoEditado = {

            id: idProducto,

            codigo: codigo.value.trim(),

            nombre: nombre.value.trim(),

            descripcion: descripcion.value.trim(),

            precio: parseFloat(precio.value),

            stock: parseInt(stock.value),

            stockCritico:
                stockCritico.value === ''
                    ? 0
                    : parseInt(stockCritico.value),

            categoria: categoria.value,

            imagen: imagen.value.trim()

        };


        /* ============================================
           REVISAR SI ES PRODUCTO GUARDADO
           ============================================ */

        var posicion = productosGuardados.findIndex(function (p) {
            return p.id === idProducto;
        });


        // Si ya estaba guardado, reemplazamos sus datos
        if (posicion !== -1) {

            productosGuardados[posicion] = productoEditado;

        } else {

            /* ============================================
               PRODUCTO ORIGINAL
               ============================================ */

            // Si era uno de los productos originales,
            // guardamos la version modificada en localStorage
            productosGuardados.push(productoEditado);


            // Tambien marcamos el original para que no
            // aparezca dos veces en la tabla
            var productosEliminados = JSON.parse(
                localStorage.getItem('productosEliminados') || '[]'
            );


            if (!productosEliminados.includes(idProducto)) {

                productosEliminados.push(idProducto);

            }


            localStorage.setItem(
                'productosEliminados',
                JSON.stringify(productosEliminados)
            );

        }


        /* ============================================
           GUARDAR
           ============================================ */

        localStorage.setItem(
            'productosEcoMarket',
            JSON.stringify(productosGuardados)
        );


        alert('Producto actualizado correctamente.');


        // Volvemos al listado
        window.location.href = 'admin-productos.html';

    });

});