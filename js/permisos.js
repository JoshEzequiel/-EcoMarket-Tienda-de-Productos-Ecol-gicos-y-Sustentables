/* ============================================
   PERMISOS.JS - EcoMarket
   Control basico para las paginas del administrador
   ============================================ */

(function () {

    // Recuperamos al usuario que inicio sesion
    var usuario = JSON.parse(
        localStorage.getItem('usuarioEcoMarket') || 'null'
    );

    // Nombre de la pagina actual
    var pagina = window.location.pathname.split('/').pop();

    // Si por algun motivo un usuario antiguo no tiene rol,
    // lo tratamos como Cliente.
    var tipoUsuario = usuario ? (usuario.tipoUsuario || 'Cliente') : '';


    /* ============================================
       SI NO HAY SESION
       ============================================ */

    if (!usuario) {

        alert('Debes iniciar sesion para entrar al administrador.');
        window.location.href = 'login.html';
        return;
    }


    /* ============================================
       CLIENTE
       ============================================ */

    // El cliente solo puede usar la tienda publica
    if (tipoUsuario === 'Cliente') {

        alert('Tu usuario no tiene permiso para entrar al administrador.');
        window.location.href = 'home.html';
        return;
    }


    /* ============================================
       VENDEDOR
       ============================================ */

    // En esta primera entrega el vendedor solo puede
    // revisar el listado de productos.
    if (tipoUsuario === 'Vendedor') {

        if (pagina !== 'admin-productos.html') {

            alert('El vendedor solo puede revisar el listado de productos.');
            window.location.href = 'admin-productos.html';
            return;
        }
    }


    // Si el rol no corresponde a los tipos definidos, no damos acceso
    if (tipoUsuario !== 'Administrador' && tipoUsuario !== 'Vendedor') {

        window.location.href = 'home.html';
        return;
    }


    /* ============================================
       ADMINISTRADOR
       ============================================ */

    // El administrador puede entrar a todas las paginas admin.
    // No es necesario hacer nada mas aqui.

})();
