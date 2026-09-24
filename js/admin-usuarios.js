/* ============================================
   ADMIN-USUARIOS.JS
   Muestra los usuarios registrados
   ============================================ */

// Esperamos que cargue toda la pagina
document.addEventListener('DOMContentLoaded', function () {

    // Tomamos el cuerpo de la tabla
    var listaUsuarios = document.getElementById('listaUsuarios');

    // Si no encuentra la tabla, no hace nada
    if (!listaUsuarios) {
        return;
    }


    /* ============================================
       OBTENER USUARIOS
       ============================================ */

    // Recuperamos los usuarios guardados en localStorage
    var usuarios = JSON.parse(
        localStorage.getItem('usuariosEcoMarket') || '[]'
    );


    /* ============================================
       MOSTRAR USUARIOS
       ============================================ */

    function mostrarUsuarios() {

        // Limpiamos la tabla antes de mostrar los datos
        listaUsuarios.innerHTML = '';


        // Si no existen usuarios mostramos un mensaje
        if (usuarios.length === 0) {

            listaUsuarios.innerHTML =
                '<tr>' +
                    '<td colspan="6">No hay usuarios registrados.</td>' +
                '</tr>';

            return;
        }


        // Recorremos todos los usuarios
        usuarios.forEach(function (usuario) {

            // Creamos una fila nueva
            var fila = document.createElement('tr');


            // Juntamos nombre y apellido
            var nombreCompleto =
                usuario.nombre + ' ' + usuario.apellido;


            // Creamos el contenido de la fila
            fila.innerHTML =

                '<td>' + usuario.run + '</td>' +

                '<td>' + nombreCompleto + '</td>' +

                '<td>' + usuario.email + '</td>' +

                '<td>' + usuario.region + '</td>' +

                '<td>' + usuario.tipoUsuario + '</td>' +

                '<td>' +

                    '<a href="admin-editar-usuario.html?id=' + usuario.id + '" class="btn-editar">' +
                        'Editar' +
                    '</a> ' +

                    '<button class="btn-eliminar" onclick="eliminarUsuario(' + usuario.id + ')">' +
                        'Eliminar' +
                    '</button>' +

                '</td>';


            // Agregamos la fila a la tabla
            listaUsuarios.appendChild(fila);

        });

    }


    // Mostramos los usuarios al cargar la pagina
    mostrarUsuarios();

});


/* ============================================
   ELIMINAR USUARIO
   ============================================ */

function eliminarUsuario(id) {

    // Preguntamos antes de eliminar
    var confirmar = confirm('¿Seguro que quieres eliminar este usuario?');

    // Si presiona cancelar, no hacemos nada
    if (!confirmar) {
        return;
    }


    // Recuperamos los usuarios guardados
    var usuarios = JSON.parse(
        localStorage.getItem('usuariosEcoMarket') || '[]'
    );


    // Dejamos todos los usuarios menos el seleccionado
    usuarios = usuarios.filter(function (usuario) {

        return usuario.id !== id;

    });


    // Guardamos nuevamente la lista
    localStorage.setItem(
        'usuariosEcoMarket',
        JSON.stringify(usuarios)
    );


    // Avisamos que se elimino
    alert('Usuario eliminado correctamente.');


    // Recargamos la pagina
    location.reload();

}