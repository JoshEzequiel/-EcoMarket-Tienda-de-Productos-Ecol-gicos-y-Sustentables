/* ============================================
   ADMIN-NUEVO-USUARIO.JS
   Valida y guarda un nuevo usuario
   ============================================ */

// Esperamos que cargue toda la pagina
document.addEventListener('DOMContentLoaded', function () {

    // Tomamos el formulario
    var form = document.getElementById('nuevoUsuarioForm');

    // Si no encuentra el formulario, no hace nada
    if (!form) {
        return;
    }


    /* ============================================
       CAMPOS DEL FORMULARIO
       ============================================ */

    var run = document.getElementById('run');
    var nombre = document.getElementById('nombre');
    var apellido = document.getElementById('apellido');
    var email = document.getElementById('email');
    var fechaNacimiento = document.getElementById('fechaNacimiento');
    var tipoUsuario = document.getElementById('tipoUsuario');
    var region = document.getElementById('region');
    var comuna = document.getElementById('comuna');
    var direccion = document.getElementById('direccion');
    var password = document.getElementById('password');


    // Mensajes de error
    var runError = document.getElementById('runError');
    var nombreError = document.getElementById('nombreError');
    var apellidoError = document.getElementById('apellidoError');
    var emailError = document.getElementById('emailError');
    var tipoUsuarioError = document.getElementById('tipoUsuarioError');
    var regionError = document.getElementById('regionError');
    var comunaError = document.getElementById('comunaError');
    var direccionError = document.getElementById('direccionError');
    var passwordError = document.getElementById('passwordError');


    /* ============================================
       COMUNAS POR REGION
       ============================================ */

    var comunasPorRegion = {

        metropolitana: [
            'Santiago',
            'La Florida',
            'Puente Alto',
            'Maipu',
            'La Pintana'
        ],

        valparaiso: [
            'Valparaiso',
            'Vina del Mar',
            'Quilpue',
            'Villa Alemana'
        ],

        biobio: [
            'Concepcion',
            'Talcahuano',
            'Chiguayante',
            'Los Angeles'
        ]

    };


    // Cuando cambia la region cargamos las comunas
    region.addEventListener('change', function () {

        // Dejamos primero la opcion por defecto
        comuna.innerHTML =
            '<option value="">Seleccione comuna</option>';


        // Buscamos las comunas de la region elegida
        var listaComunas = comunasPorRegion[region.value];


        // Si existen comunas las agregamos al select
        if (listaComunas) {

            listaComunas.forEach(function (nombreComuna) {

                var opcion = document.createElement('option');

                opcion.value = nombreComuna;
                opcion.textContent = nombreComuna;

                comuna.appendChild(opcion);

            });

        }

    });


    /* ============================================
       VALIDAR CORREO
       ============================================ */

    function correoPermitido(correo) {

        return correo.endsWith('@duoc.cl') ||
               correo.endsWith('@profesor.duoc.cl') ||
               correo.endsWith('@gmail.com');

    }


    /* ============================================
       VALIDAR RUN
       ============================================ */

    function validarRun(runTexto) {

        // Pasamos la K a mayuscula y quitamos espacios
        runTexto = runTexto.toUpperCase().trim();


        // La pauta indica minimo 7 y maximo 9
        if (runTexto.length < 7 || runTexto.length > 9) {
            return false;
        }


        // Separamos numero y digito verificador
        var cuerpo = runTexto.slice(0, -1);
        var dv = runTexto.slice(-1);


        // El cuerpo debe tener solo numeros
        if (!/^[0-9]+$/.test(cuerpo)) {
            return false;
        }


        var suma = 0;
        var multiplicador = 2;


        // Recorremos el RUN desde el final
        for (var i = cuerpo.length - 1; i >= 0; i--) {

            suma = suma + parseInt(cuerpo.charAt(i)) * multiplicador;

            multiplicador++;

            if (multiplicador > 7) {
                multiplicador = 2;
            }

        }


        var resto = suma % 11;
        var resultado = 11 - resto;

        var dvCorrecto;


        if (resultado === 11) {

            dvCorrecto = '0';

        } else if (resultado === 10) {

            dvCorrecto = 'K';

        } else {

            dvCorrecto = resultado.toString();

        }


        return dv === dvCorrecto;
    }


    /* ============================================
       ENVIAR FORMULARIO
       ============================================ */

    form.addEventListener('submit', function (e) {

        // Evitamos que se recargue la pagina
        e.preventDefault();

        var valido = true;


        /* RUN */

        if (run.value.trim() === '') {

            runError.textContent = 'El RUN es obligatorio.';
            valido = false;

        } else if (!validarRun(run.value)) {

            runError.textContent =
                'El RUN no es valido. Escribelo sin puntos ni guion.';

            valido = false;

        } else {

            runError.textContent = '';
        }


        /* NOMBRE */

        if (nombre.value.trim() === '') {

            nombreError.textContent = 'El nombre es obligatorio.';
            valido = false;

        } else if (nombre.value.trim().length > 50) {

            nombreError.textContent =
                'El nombre no puede superar los 50 caracteres.';

            valido = false;

        } else {

            nombreError.textContent = '';
        }


        /* APELLIDOS */

        if (apellido.value.trim() === '') {

            apellidoError.textContent = 'Los apellidos son obligatorios.';
            valido = false;

        } else if (apellido.value.trim().length > 100) {

            apellidoError.textContent =
                'Los apellidos no pueden superar los 100 caracteres.';

            valido = false;

        } else {

            apellidoError.textContent = '';
        }


        /* CORREO */

        var correo = email.value.trim();

        if (correo === '') {

            emailError.textContent = 'El correo es obligatorio.';
            valido = false;

        } else if (correo.length > 100) {

            emailError.textContent =
                'El correo no puede superar los 100 caracteres.';

            valido = false;

        } else if (!correoPermitido(correo)) {

            emailError.textContent =
                'Solo se permite @duoc.cl, @profesor.duoc.cl o @gmail.com.';

            valido = false;

        } else {

            emailError.textContent = '';
        }


        /* TIPO DE USUARIO */

        if (tipoUsuario.value === '') {

            tipoUsuarioError.textContent =
                'Selecciona un tipo de usuario.';

            valido = false;

        } else {

            tipoUsuarioError.textContent = '';
        }


        /* REGION */

        if (region.value === '') {

            regionError.textContent =
                'Selecciona una region.';

            valido = false;

        } else {

            regionError.textContent = '';
        }


        /* COMUNA */

        if (comuna.value === '') {

            comunaError.textContent =
                'Selecciona una comuna.';

            valido = false;

        } else {

            comunaError.textContent = '';
        }


        /* DIRECCION */

        if (direccion.value.trim() === '') {

            direccionError.textContent =
                'La direccion es obligatoria.';

            valido = false;

        } else if (direccion.value.trim().length > 300) {

            direccionError.textContent =
                'La direccion no puede superar los 300 caracteres.';

            valido = false;

        } else {

            direccionError.textContent = '';
        }


        /* CONTRASENA */

        if (password.value === '') {

            passwordError.textContent =
                'La contrasena es obligatoria.';

            valido = false;

        } else if (
            password.value.length < 4 ||
            password.value.length > 10
        ) {

            passwordError.textContent =
                'La contrasena debe tener entre 4 y 10 caracteres.';

            valido = false;

        } else {

            passwordError.textContent = '';
        }


        /* ============================================
           SI HAY ERRORES NO GUARDAMOS
           ============================================ */

        if (!valido) {

            alert('Revisa los datos del formulario.');

            return;
        }


        /* ============================================
           OBTENER USUARIOS GUARDADOS
           ============================================ */

        var usuarios = JSON.parse(
            localStorage.getItem('usuariosEcoMarket') || '[]'
        );


        /* ============================================
           EVITAR CORREO REPETIDO
           ============================================ */

        var correoExiste = usuarios.some(function (usuario) {

            return usuario.email === correo;

        });


        if (correoExiste) {

            emailError.textContent =
                'Ya existe un usuario con este correo.';

            return;
        }


        /* ============================================
           CREAR USUARIO
           ============================================ */

        var nuevoUsuario = {

            id: Date.now(),

            run: run.value.trim().toUpperCase(),

            nombre: nombre.value.trim(),

            apellido: apellido.value.trim(),

            email: correo,

            fechaNacimiento: fechaNacimiento.value,

            tipoUsuario: tipoUsuario.value,

            region: region.value,

            comuna: comuna.value,

            direccion: direccion.value.trim(),

            password: password.value

        };


        /* ============================================
           GUARDAR EN LOCALSTORAGE
           ============================================ */

        usuarios.push(nuevoUsuario);


        localStorage.setItem(
            'usuariosEcoMarket',
            JSON.stringify(usuarios)
        );


        // Avisamos que se guardo correctamente
        alert('Usuario guardado correctamente.');


        // Volvemos al listado de usuarios
        window.location.href = 'admin-usuarios.html';

    });

});