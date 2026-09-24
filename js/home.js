/* ============================================
   HOME.JS - EcoMarket
   Renderiza SOLO los productos destacados
   Se carga SOLO en home.html
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {

    if (typeof productos === 'undefined') {
        console.error('❌ No se encontró productos-data.js');
        return;
    }

    // Obtenemos la lista actualizada de productos
    var productosActuales = obtenerProductosActuales();

    var grid = document.getElementById('productosDestacados');
    if (!grid) {
        console.error('❌ No existe #productosDestacados en el HTML');
        return;
    }

    console.log('📦 Total de productos:', productosActuales.length);

    // Filtro estricto
    var destacados = productosActuales.filter(function (p) {
        return p.destacado === true;
    });

    console.log('⭐ Destacados encontrados:', destacados.length);
    console.log('⭐ Nombres:', destacados.map(function (p) { return p.nombre; }));

    // Si no hay destacados, mostrar primeros 4
    if (destacados.length === 0) {
        console.warn('⚠️ Ningún producto tiene destacado:true. Mostrando los primeros 4.');
        destacados = productosActuales.slice(0, 4);
    }

    // Renderizar
    grid.innerHTML = destacados.map(function (p) {
        return '' +
            '<article class="producto-card">' +
                '<div class="producto-img">' +
                    '<img src="' + p.imagen + '" alt="' + p.nombre + '" ' +
                         'onerror="this.src=\'https://via.placeholder.com/300x300/e8f5e9/2e7d32?text=' + encodeURIComponent(p.nombre) + '\'">' +
                    '<span class="badge">' + p.badge + '</span>' +
                '</div>' +
                '<div class="producto-info">' +
                    '<span class="categoria-tag">' + p.etiquetaCategoria + '</span>' +
                    '<h3>' + p.nombre + '</h3>' +
                    '<p class="desc">' + p.desc + '</p>' +
                    '<div class="precio-row">' +
                        '<span class="precio">$' + p.precio.toLocaleString('es-CL') + '</span>' +
                        '<span class="precio-antes">$' + p.precioAntes.toLocaleString('es-CL') + '</span>' +
                    '</div>' +
                    '<button class="btn-add" onclick="agregarAlCarrito(' + p.id + ')">' +
                        '🛒 Agregar al carrito' +
                    '</button>' +
                '</div>' +
            '</article>';
    }).join('');
});