/* ============================================
   PRODUCTOS.JS - EcoMarket
   Renderiza productos con filtros por categoría
   Se carga SOLO en productos.html
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {

    if (typeof productos === 'undefined') {
        console.error('❌ No se encontró productos-data.js');
        return;
    }

    // Obtenemos la lista actualizada, incluyendo cambios del administrador
    var productosActuales = obtenerProductosActuales();

    var productosGrid  = document.getElementById('productosGrid');
    var numResultados  = document.getElementById('numResultados');
    var sinResultados  = document.getElementById('sinResultados');
    var filterButtons  = document.querySelectorAll('.filter-btn');

    if (!productosGrid) {
        console.error('❌ No existe #productosGrid en el HTML');
        return;
    }

    /* ============================================
       RENDERIZAR SEGÚN CATEGORÍA
       ============================================ */
    function renderizar(categoria) {
        var lista = categoria === 'todos'
            ? productosActuales
            : productosActuales.filter(function (p) { return p.categoria === categoria; });

        if (numResultados) numResultados.textContent = lista.length;

        if (lista.length === 0) {
            productosGrid.innerHTML = '';
            if (sinResultados) sinResultados.style.display = 'block';
            return;
        }
        if (sinResultados) sinResultados.style.display = 'none';

        productosGrid.innerHTML = lista.map(function (p) {
            return '' +
                '<article class="producto-card" data-categoria="' + p.categoria + '">' +
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
                        '<a class="btn-detalle" href="detalle-producto.html?id=' + p.id + '">' +
                            'Ver detalle' +
                        '</a>' +
                        '<button class="btn-add" onclick="agregarAlCarrito(' + p.id + ')">' +
                            '🛒 Agregar al carrito' +
                        '</button>' +
                    '</div>' +
                '</article>';
        }).join('');
    }

    /* ============================================
       CLIC EN FILTROS
       ============================================ */
    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterButtons.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');

            renderizar(this.dataset.categoria);

            document.querySelector('.productos-grid').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    /* ============================================
       INIT
       ============================================ */
    renderizar('todos');
});