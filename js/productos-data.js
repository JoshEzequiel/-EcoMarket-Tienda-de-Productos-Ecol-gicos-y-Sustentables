const productos = [
    {
        id: 1,
        codigo: "ECO001",
        nombre: "Máquina de Afeitar de Acero",
        desc: "Afeitadora metálica reutilizable, alternativa a las desechables",
        precio: 12990,
        precioAntes: 16990,
        stock: 10,
        stockCritico: 3,
        categoria: "cuidado",
        etiquetaCategoria: "Cuidado Personal",
        badge: "♻️ Residuo Cero",
        imagen: "../assets/img/producto1.png",
        destacado: true
    },

    {
        id: 2,
        codigo: "ECO002",
        nombre: "Mix de Frutos Secos GO Mix",
        desc: "Semilla de zapallo, cranberries, almendras, maní y coco - 70g",
        precio: 2490,
        precioAntes: 3290,
        stock: 3,
        stockCritico: 3,
        categoria: "alimentos",
        etiquetaCategoria: "Alimentos Orgánicos",
        badge: "🥗 100% Natural",
        imagen: "../assets/img/producto2.png",
        destacado: true
    },

    {
        id: 3,
        codigo: "ECO003",
        nombre: "Polera de Algodón Orgánico",
        desc: "Certificación GOTS, tintes naturales y estampado ecológico",
        precio: 18990,
        precioAntes: 24990,
        stock: 15,
        stockCritico: 5,
        categoria: "vestimenta",
        etiquetaCategoria: "Vestimenta Sustentable",
        badge: "👕 Algodón Orgánico",
        imagen: "../assets/img/producto3.png",
        destacado: true
    },

    {
        id: 4,
        codigo: "ECO004",
        nombre: "Powerbank Solar 10.000 mAh",
        desc: "Cargador portátil con panel solar integrado y energía limpia",
        precio: 24990,
        precioAntes: 32990,
        stock: 2,
        stockCritico: 5,
        categoria: "tecnologia",
        etiquetaCategoria: "Tecnología Eco",
        badge: "☀️ Energía Solar",
        imagen: "../assets/img/producto4.png",
        destacado: false
    }
];


/* ============================================
   PRODUCTOS ACTUALES DE LA TIENDA
   Junta los productos originales con los que
   se crean o editan desde el administrador.
   ============================================ */

function obtenerNombreCategoria(categoria) {

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


function obtenerProductosActuales() {

    // Productos creados o editados desde el administrador
    var productosGuardados = JSON.parse(
        localStorage.getItem('productosEcoMarket') || '[]'
    );

    // IDs de productos originales que fueron eliminados o reemplazados
    var productosEliminados = JSON.parse(
        localStorage.getItem('productosEliminados') || '[]'
    );

    var lista = [];


    // Agregamos los productos originales que siguen activos
    productos.forEach(function (producto) {

        if (!productosEliminados.includes(producto.id)) {
            lista.push(producto);
        }

    });


    // Agregamos los productos creados o modificados desde el administrador
    productosGuardados.forEach(function (producto) {

        // Si era un producto original, usamos algunos datos originales
        // que no se editan desde el formulario, por ejemplo el badge.
        var productoOriginal = productos.find(function (p) {
            return p.id === producto.id;
        });

        var productoPreparado = {
            id: producto.id,
            codigo: producto.codigo || '',
            nombre: producto.nombre || '',
            desc: producto.descripcion || producto.desc || '',
            precio: Number(producto.precio) || 0,
            precioAntes: producto.precioAntes ||
                         (productoOriginal ? productoOriginal.precioAntes : producto.precio),
            stock: Number(producto.stock) || 0,
            stockCritico: Number(producto.stockCritico) || 0,
            categoria: producto.categoria || '',
            etiquetaCategoria: producto.etiquetaCategoria ||
                               obtenerNombreCategoria(producto.categoria),
            badge: producto.badge ||
                   (productoOriginal ? productoOriginal.badge : '🌱 Producto Eco'),
            imagen: producto.imagen ||
                    (productoOriginal ? productoOriginal.imagen : '../assets/img/eco.png'),
            destacado: producto.destacado !== undefined
                        ? producto.destacado
                        : (productoOriginal ? productoOriginal.destacado : false)
        };

        lista.push(productoPreparado);

    });


    return lista;
}

