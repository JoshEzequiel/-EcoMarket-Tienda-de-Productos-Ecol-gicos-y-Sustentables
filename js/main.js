/* ============================================
   MAIN.JS - EcoMarket
   Carrito global + Cupón ECO10 + Notificaciones
   Se carga en TODAS las páginas
   ============================================ */
(function () {
    'use strict';

    var carrito = JSON.parse(localStorage.getItem('carritoEcoMarket') || '[]');
    var cuponAplicado = false;
    var CUPON_VALIDO = "ECO10";
    var DESCUENTO = 0.10;

    /* ============================================
       ACTUALIZAR CARRITO (UI)
       ============================================ */
    function actualizarCarrito() {
        var cartCount      = document.getElementById('cartCount');
        var cartItems      = document.getElementById('cartItems');
        var subtotalEl     = document.getElementById('subtotal');
        var descuentoEl    = document.getElementById('descuento');
        var totalEl        = document.getElementById('total');
        var descuentoLinea = document.getElementById('descuento-linea');

        if (cartCount) {
            var totalItems = carrito.reduce(function (s, i) { return s + i.cantidad; }, 0);
            cartCount.textContent = totalItems;
        }

        if (cartItems) {
            if (carrito.length === 0) {
                cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
            } else {
                cartItems.innerHTML = carrito.map(function (item) {
                    return '' +
                        '<div class="cart-item">' +
                            '<div class="cart-item-info">' +
                                '<h4>' + item.nombre + '</h4>' +
                                '<p>$' + item.precio.toLocaleString('es-CL') + ' c/u</p>' +
                            '</div>' +
                            '<div class="cart-item-controls">' +
                                '<button onclick="cambiarCantidad(' + item.id + ', -1)">−</button>' +
                                '<span>' + item.cantidad + '</span>' +
                                '<button onclick="cambiarCantidad(' + item.id + ', 1)">+</button>' +
                                '<button class="btn-remove" onclick="eliminarDelCarrito(' + item.id + ')">✕</button>' +
                            '</div>' +
                        '</div>';
                }).join('');
            }
        }

        var subtotal  = carrito.reduce(function (s, i) { return s + (i.precio * i.cantidad); }, 0);
        var descuento = cuponAplicado ? Math.round(subtotal * DESCUENTO) : 0;
        var total     = subtotal - descuento;

        if (subtotalEl)  subtotalEl.textContent  = subtotal.toLocaleString('es-CL');
        if (descuentoEl) descuentoEl.textContent = descuento.toLocaleString('es-CL');
        if (totalEl)     totalEl.textContent     = total.toLocaleString('es-CL');

        if (descuentoLinea) {
            if (cuponAplicado && subtotal > 0) descuentoLinea.classList.remove('oculto');
            else descuentoLinea.classList.add('oculto');
        }

        localStorage.setItem('carritoEcoMarket', JSON.stringify(carrito));
    }

    /* ============================================
       AGREGAR AL CARRITO
       ============================================ */
    window.agregarAlCarrito = function (id) {
        if (typeof productos === 'undefined') {
            console.error('❌ No se encontró productos-data.js');
            return;
        }

        // Usamos la lista actualizada para que tambien funcionen
        // los productos creados o editados desde el administrador
        var productosActuales = obtenerProductosActuales();

        var producto = productosActuales.find(function (p) {
            return p.id === id;
        });

        if (!producto) return;

        var item = carrito.find(function (i) { return i.id === id; });
        if (item) {
            item.cantidad++;
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1
            });
        }

        actualizarCarrito();
        mostrarNotificacion('✅ ' + producto.nombre + ' agregado');
    };

    /* ============================================
       ELIMINAR DEL CARRITO
       ============================================ */
    window.eliminarDelCarrito = function (id) {
        carrito = carrito.filter(function (i) { return i.id !== id; });
        actualizarCarrito();
    };

    /* ============================================
       CAMBIAR CANTIDAD
       ============================================ */
    window.cambiarCantidad = function (id, delta) {
        var item = carrito.find(function (i) { return i.id === id; });
        if (!item) return;
        item.cantidad += delta;
        if (item.cantidad <= 0) eliminarDelCarrito(id);
        else actualizarCarrito();
    };

    /* ============================================
       CUPÓN ECO10
       ============================================ */
    window.aplicarCupon = function () {
        var input = document.getElementById('cupon');
        var msg   = document.getElementById('cupon-msg');
        if (!input || !msg) return;

        var codigo = input.value.trim().toUpperCase();

        if (carrito.length === 0) {
            msg.textContent = '⚠️ Agrega productos primero';
            msg.className = 'error';
            return;
        }

        if (codigo === CUPON_VALIDO) {
            cuponAplicado = true;
            msg.textContent = '✅ Cupón ECO10 aplicado (10% off)';
            msg.className = 'ok';
        } else {
            cuponAplicado = false;
            msg.textContent = '❌ Cupón inválido. Usa ECO10';
            msg.className = 'error';
        }
        actualizarCarrito();
    };

    /* ============================================
       FINALIZAR COMPRA
       ============================================ */
    window.finalizarCompra = function () {
        if (carrito.length === 0) {
            alert('🛒 Tu carrito está vacío.');
            return;
        }
        var totalEl = document.getElementById('total');
        var total = totalEl ? totalEl.textContent : '0';
        alert('🌱 ¡Gracias por tu compra sustentable!\n\nTotal: $' + total + '\n\n💚 Ayudaste al planeta');

        carrito = [];
        cuponAplicado = false;
        var input = document.getElementById('cupon');
        var msg   = document.getElementById('cupon-msg');
        if (input) input.value = '';
        if (msg)   msg.textContent = '';
        actualizarCarrito();
        toggleCart();
    };

    /* ============================================
       ABRIR / CERRAR CARRITO
       ============================================ */
    window.toggleCart = function () {
        var sidebar = document.getElementById('cartSidebar');
        if (!sidebar) {
            console.error('❌ No existe #cartSidebar en el HTML');
            return;
        }
        sidebar.classList.toggle('active');
    };

    /* ============================================
       LISTENER GLOBAL (funciona en cualquier página)
       ============================================ */
    document.addEventListener('click', function (e) {
        // Abrir/cerrar al hacer clic en el icono del carrito (o cualquier hijo)
        var icono = e.target.closest('#cartIcon');
        if (icono) {
            e.preventDefault();
            e.stopPropagation();
            window.toggleCart();
            return;
        }

        // Cerrar al hacer clic fuera del panel
        var sidebar = document.getElementById('cartSidebar');
        if (sidebar && sidebar.classList.contains('active')) {
            var clickDentro = sidebar.contains(e.target);
            var clickIcono  = e.target.closest('#cartIcon');
            if (!clickDentro && !clickIcono) {
                sidebar.classList.remove('active');
            }
        }
    });

    /* ============================================
       NOTIFICACIÓN FLOTANTE
       ============================================ */
    function mostrarNotificacion(msg) {
        var n = document.createElement('div');
        n.textContent = msg;
        n.style.cssText =
            'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);' +
            'background:#1b5e20;color:#fff;padding:12px 24px;border-radius:30px;' +
            'box-shadow:0 6px 20px rgba(0,0,0,0.2);z-index:3000;font-weight:600;' +
            'opacity:0;transition:opacity 0.3s;';
        document.body.appendChild(n);
        requestAnimationFrame(function () { n.style.opacity = '1'; });
        setTimeout(function () {
            n.style.opacity = '0';
            setTimeout(function () { n.remove(); }, 300);
        }, 1800);
    }

    /* ============================================
       INICIALIZAR
       ============================================ */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', actualizarCarrito);
    } else {
        actualizarCarrito();
    }
})();

/* ============================================
   BLOG - MODAL "LEER MÁS"
   ============================================ */
(function () {
    'use strict';

    // Contenido de los blogs
    var blogs = {
        1: {
            titulo: "5 formas de reducir el plástico en tu rutina diaria",
            fecha: "Publicado: 15 de Marzo, 2025",
            contenido: `
                <p>El plástico está en todas partes: botellas, bolsas, envases, cubiertos, bombillas. Cada año llegan a los océanos más de <strong>11 millones de toneladas de plástico</strong>. La buena noticia: pequeños cambios en tu rutina diaria pueden generar un gran impacto.</p>

                <h3>1. Lleva tus propias bolsas reutilizables 🛍️</h3>
                <p>Diles adiós a las bolsas plásticas del supermercado. Usa bolsas de tela o de materiales reciclados. Una sola bolsa reutilizable puede evitar más de <strong>700 bolsas plásticas</strong> al año.</p>

                <h3>2. Cambia a cepillos de bambú 🪥</h3>
                <p>Los cepillos dentales plásticos tardan más de <strong>500 años</strong> en degradarse. El bambú es compostable y biodegradable. Además, puedes encontrar cepillos con cerdas de origen vegetal.</p>

                <h3>3. Usa botellas y vasos reutilizables 🥤</h3>
                <p>Evita comprar agua embotellada. Lleva tu botella de acero inoxidable a todos lados. Un solo termo puede reemplazar más de <strong>150 botellas plásticas</strong> al año.</p>

                <h3>4. Compra a granel 🥜</h3>
                <p>Lleva tus propios frascos y bolsas de tela para cereales, legumbres, frutos secos, café y especias. Es más económico y elimina el empaque plástico innecesario.</p>

                <h3>5. Rechaza cubiertos y bombillas plásticas 🍴</h3>
                <p>Lleva tu propio kit de cubiertos portátil y bombillas de acero o bambú. Los plásticos de un solo uso son uno de los mayores contaminantes.</p>

                <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #c8e6c9;"><strong>💚 Cada pequeño cambio cuenta.</strong> No tienes que hacer todo de una vez. Elige uno o dos hábitos esta semana, y verás que pronto se vuelven naturales.</p>
            `
        },
        2: {
            titulo: "¿Qué significa realmente el sello Cruelty-Free?",
            fecha: "Publicado: 22 de Marzo, 2025",
            contenido: `
                <p>Cuando ves la etiqueta <strong>"Cruelty-Free"</strong> en un producto, significa que ese producto <em>no fue testeado en animales</em> durante ninguna etapa de su producción. Pero hay matices importantes que vale la pena conocer.</p>

                <h3>🐰 ¿Cómo se identifica?</h3>
                <p>Busca el ícono del conejito saltando, conocido como <strong>Leaping Bunny</strong>. También existe el sello <strong>PETA Beauty Without Bunnies</strong>. Si no ves ninguno de estos, el producto podría NO estar certificado realmente.</p>

                <h3>⚠️ ¿Cuál es la diferencia con "vegano"?</h3>
                <p>Un producto <strong>vegano</strong> no contiene ingredientes de origen animal (miel, cera de abeja, lanolina, etc.). Un producto <strong>cruelty-free</strong> no fue testeado en animales, pero podría contener ingredientes de origen animal. Los dos conceptos son independientes.</p>

                <h3>🔬 ¿Por qué importa?</h3>
                <p>Cada año se usan más de <strong>115 millones de animales</strong> en experimentos de laboratorio en todo el mundo, incluyendo conejos, ratones, cobayos y perros. Los test cosméticos causan sufrimiento innecesario y existen alternativas modernas como cultivos celulares y modelos computacionales.</p>

                <h3>🌱 ¿Qué puedes hacer?</h3>
                <ul>
                    <li>Busca siempre certificaciones oficiales (Leaping Bunny, PETA).</li>
                    <li>Prefiere marcas locales que publiquen su política de testeo.</li>
                    <li>Descarga apps como <em>Cruelty-Free</em> o <em>Bunny Free</em> para escanear productos.</li>
                    <li>Comparte información con amigos y familiares.</li>
                </ul>

                <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #c8e6c9;">En <strong>EcoMarket</strong> todos nuestros productos de cuidado personal están certificados como Cruelty-Free. Puedes estar tranquilo/a: ninguna de tus compras financió sufrimiento animal. 🐰💚</p>
            `
        }
    };

    /* ============================================
       ABRIR BLOG
       ============================================ */
    window.leerBlog = function (id) {
        var modal = document.getElementById('blogModal');
        var body  = document.getElementById('blogModalBody');

        if (!modal || !body) {
            console.error('❌ No existe #blogModal o #blogModalBody en el HTML');
            return;
        }

        var blog = blogs[id];
        if (!blog) {
            console.error('❌ No existe el blog con id:', id);
            return;
        }

        body.innerHTML =
            '<h2>' + blog.titulo + '</h2>' +
            '<p class="blog-modal-date">' + blog.fecha + '</p>' +
            '<div class="blog-modal-content">' + blog.contenido + '</div>';

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // bloquear scroll del fondo
    };

    /* ============================================
       CERRAR BLOG
       ============================================ */
    window.cerrarBlog = function () {
        var modal = document.getElementById('blogModal');
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = ''; // restaurar scroll
    };

    /* ============================================
       CERRAR AL HACER CLIC FUERA
       ============================================ */
    document.addEventListener('click', function (e) {
        var modal = document.getElementById('blogModal');
        if (modal && modal.classList.contains('active') && e.target === modal) {
            window.cerrarBlog();
        }
    });

    /* ============================================
       CERRAR CON TECLA ESC
       ============================================ */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            window.cerrarBlog();
        }
    });

})();