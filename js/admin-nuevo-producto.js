/* ============================================
   ADMIN-NUEVO-PRODUCTO.JS
   Valida y guarda un nuevo producto
   ============================================ */

// Esperamos que cargue toda la pagina
document.addEventListener('DOMContentLoaded', function () {

    // Tomamos el formulario
    var form = document.getElementById('productoForm');

    // Si no encuentra el formulario, no hace nada
    if (!form) {
        return;
    }

    // Tomamos los campos del formulario
    var codigo = document.getElementById('codigo');
    var nombre = document.getElementById('nombreProducto');
    var descripcion = document.getElementById('descripcion');
    var precio = document.getElementById('precio');
    var stock = document.getElementById('stock');
    var stockCritico = document.getElementById('stockCritico');
    var categoria = document.getElementById('categoria');
    var imagen = document.getElementById('imagen');

    // Tomamos los mensajes de error
    var codigoError = document.getElementById('codigoError');
    var nombreError = document.getElementById('nombreProductoError');
    var descripcionError = document.getElementById('descripcionError');
    var precioError = document.getElementById('precioError');
    var stockError = document.getElementById('stockError');
    var stockCriticoError = document.getElementById('stockCriticoError');
    var categoriaError = document.getElementById('categoriaError');


    /* ============================================
       GUARDAR PRODUCTO
       ============================================ */

    form.addEventListener('submit', function (e) {

        // Evita que la pagina se recargue
        e.preventDefault();

        // Esta variable nos dice si todo esta correcto
        var valido = true;


        /* ============================================
           VALIDAR CODIGO
           ============================================ */

        if (codigo.value.trim() === '') {

            codigoError.textContent = 'El codigo es obligatorio.';
            valido = false;

        } else if (codigo.value.trim().length < 3) {

            codigoError.textContent = 'El codigo debe tener minimo 3 caracteres.';
            valido = false;

        } else {

            codigoError.textContent = '';
        }


        /* ============================================
           VALIDAR NOMBRE
           ============================================ */

        if (nombre.value.trim() === '') {

            nombreError.textContent = 'El nombre es obligatorio.';
            valido = false;

        } else if (nombre.value.trim().length > 100) {

            nombreError.textContent = 'El nombre no puede superar los 100 caracteres.';
            valido = false;

        } else {

            nombreError.textContent = '';
        }


        /* ============================================
           VALIDAR DESCRIPCION
           ============================================ */

        if (descripcion.value.length > 500) {

            descripcionError.textContent = 'La descripcion no puede superar los 500 caracteres.';
            valido = false;

        } else {

            descripcionError.textContent = '';
        }


        /* ============================================
           VALIDAR PRECIO
           ============================================ */

        if (precio.value === '') {

            precioError.textContent = 'El precio es obligatorio.';
            valido = false;

        } else if (parseFloat(precio.value) < 0) {

            precioError.textContent = 'El precio no puede ser menor a 0.';
            valido = false;

        } else {

            precioError.textContent = '';
        }


        /* ============================================
           VALIDAR STOCK
           ============================================ */

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


        /* ============================================
           VALIDAR STOCK CRITICO
           ============================================ */

        // Este campo es opcional
        if (stockCritico.value !== '') {

            if (parseInt(stockCritico.value) < 0) {

                stockCriticoError.textContent = 'El stock critico no puede ser menor a 0.';
                valido = false;

            } else if (!Number.isInteger(Number(stockCritico.value))) {

                stockCriticoError.textContent = 'El stock critico debe ser un numero entero.';
                valido = false;

            } else {

                stockCriticoError.textContent = '';
            }

        } else {

            stockCriticoError.textContent = '';
        }


        /* ============================================
           VALIDAR CATEGORIA
           ============================================ */

        if (categoria.value === '') {

            categoriaError.textContent = 'Selecciona una categoria.';
            valido = false;

        } else {

            categoriaError.textContent = '';
        }


        /* ============================================
           SI HAY ERRORES NO GUARDAMOS
           ============================================ */

        if (!valido) {

            alert('Revisa los datos del formulario.');
            return;
        }


        /* ============================================
           OBTENER PRODUCTOS GUARDADOS
           ============================================ */

        // Buscamos productos guardados anteriormente
        var productosGuardados = JSON.parse(
            localStorage.getItem('productosEcoMarket') || '[]'
        );


        /* ============================================
           REVISAR CODIGO REPETIDO
           ============================================ */

        var codigoExiste = productosGuardados.some(function (producto) {

            return producto.codigo.toUpperCase() ===
                   codigo.value.trim().toUpperCase();
        });


        if (codigoExiste) {

            codigoError.textContent = 'Ya existe un producto con este codigo.';
            return;
        }


        /* ============================================
           CREAR PRODUCTO
           ============================================ */

        var nuevoProducto = {

            id: Date.now(),

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
           GUARDAR EN LOCALSTORAGE
           ============================================ */

        productosGuardados.push(nuevoProducto);

        localStorage.setItem(
            'productosEcoMarket',
            JSON.stringify(productosGuardados)
        );


        // Avisamos que se guardo correctamente
        alert('Producto guardado correctamente.');


        // Volvemos al listado de productos
        window.location.href = 'admin-productos.html';

    });

});